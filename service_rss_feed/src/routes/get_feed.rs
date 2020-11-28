use actix_session::Session;
use actix_web::{web, HttpResponse};
use itertools::Itertools;
use rss::{Channel};
use sqlx::PgPool;
use uuid::Uuid;

use crate::data::{Subscription};
use crate::api::{UserSubscription, Feed, RssChannel, ItemConverter};

#[tracing::instrument(
    name = "Finding subscribed feeds",
    skip(pool, session)
)]
pub async fn get_feeds(
    session: Session,
    pool: web::Data<PgPool>
) -> Result<HttpResponse, HttpResponse> {
    let profile_id: Option<Uuid> = session.get("profile_id")?;

    let profile_id = match profile_id {
        Some(id) => id,
        None => return Err(HttpResponse::InternalServerError().finish())
    };

    let mut user_feeds = Vec::new();

    let subscriptions = get_subscriptions_for_profile(profile_id, &pool)
        .await
        .unwrap_or(Vec::new());

    let categories: Vec<String> = subscriptions
            .iter()
            .map(|sub| sub.category.clone())
            .unique()
            .collect();

    categories
        .into_iter()
        .for_each(|category| {
            let mut channels = Vec::new();

            subscriptions
                .iter()
                .filter(|sub| {
                    sub.category.clone() == category
                })
                .for_each(|sub| {
                    let channel = Channel::from_url(&sub.channel_url);
                    
                    match channel {
                        Ok(c) => {
                            channels.push(
                                RssChannel {
                                    title: c.title().to_string(),
                                    link: c.link().to_string(),
                                    description: c.description().to_string(),
                                    pub_date: c.pub_date().unwrap_or_default().to_string(),
                                    last_build_date: c.last_build_date().unwrap_or_default().to_string(),
                                    image_url: match c.image() {
                                        Some(img) => img.url().to_string(),
                                        None => "".to_string()
                                    },
                                    items: c.into_items()
                                        .into_iter()
                                        .map(|mut item| item.to_response())
                                        .collect() 
                                }
                            );
                        }
                        Err(e) => { tracing::warn!("Channel does not exist: {}", e) }
                    }
                });

            user_feeds.push(
                Feed {
                    category: category,
                    channels: channels 
                }
            );
        });

    Ok(
        HttpResponse::Ok().json(UserSubscription { feeds: user_feeds })
    )
}

async fn get_subscriptions_for_profile(profile_id: Uuid, pool: &PgPool) -> Result<Vec<Subscription>, sqlx::Error> {
    let feeds = sqlx::query_as!(
        Subscription,
        r#"
        SELECT * FROM subscription 
        WHERE profile_id=$1
        "#,
        profile_id
    )
    .fetch_all(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?;

    Ok(feeds)
}
