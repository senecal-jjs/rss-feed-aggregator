use actix_session::Session;
use actix_web::{web, HttpResponse};
use rss::{Channel, Item};
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
        .unwrap_or_else(|_| { None });

    let categories = match subscriptions {
        Ok(subscriptions) => subscriptions
            .into_iter()
            .map(|sub| sub.category)
            .unique(),
        Err(e) => return Err(HttpResponse::InternalServerError().finish())
    };

    categories
        .for_each(|category, iter| {
            let mut channels = Vec::new();

            subscriptions
                .filter(|sub| {
                    sub.category == category
                })
                .for_each(|sub, iter| {
                    let channel = Channel::from_url(sub.channel_url)
                        .map_err(|_| HttpResponse::InternalServerError().finish())?;

                    channels.push(
                        RssChannel {
                            title: channel.title().unwrap_or_else(|_| { String::from("") },
                            link: channel.link().unwrap_or_else(|_| { String::from("") },
                            description: channel.description().unwrap_or_else(|_| { String::from("") },
                            pub_date: channel.pub_date().unwrap_or_else(|_| { String::from("") },
                            last_build_date: channel.last_build_date().unwrap_or_else(|_| { String::from("") },
                            image_url: channel.image().unwrap_or_else(|_| { String::from("") },
                            items: channel.items()
                                .map(|item| item.toResponse()) 
                        }
                    );
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
