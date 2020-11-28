use actix_session::Session;
use actix_web::{web, HttpResponse};
use rss::Channel;
use sqlx::PgPool;
use uuid::Uuid;

use crate::api::{RssForm};

#[derive(serde::Deserialize)]
pub struct RssFeed {
    channel: String, 
    title: String,
    feed_desc: String,
    site_link: String,
}

#[tracing::instrument(
    name = "Adding new RSS feed",
    skip(form, pool, session),
    fields(
        feed_link = %form.link
    )
)]
pub async fn save_feed(
    form: web::Form<RssForm>,
    session: Session, 
    pool: web::Data<PgPool>
) -> Result<HttpResponse, HttpResponse> {
    let channel = Channel::from_url(&form.link)
        .map_err(|_| HttpResponse::InternalServerError().finish())?;

    let rss_feed = RssFeed {
        channel: form.link.clone(),
        title: channel.title().to_string(),
        feed_desc: channel.description().to_string(),
        site_link: channel.link().to_string(),
    };

    let channel_id = rss_feed_exists(&pool, &rss_feed)
        .await
        .unwrap_or_else(|_| {
            None  
        });

    let profile_id: Option<Uuid> = session.get("profile_id")?;

    if channel_id.is_none() {
        let channel_id = insert_rss_feed(&pool, &rss_feed)
            .await
            .map_err(|_| HttpResponse::InternalServerError().finish())?;
        
        if let Some(_) = profile_id {
            subscribe_to_feed(profile_id.unwrap(), channel_id, &form.link, &pool)
                .await
                .map_err(|_| HttpResponse::InternalServerError().finish())?;
        } 
    } else {
        tracing::info!("RSS feed {} already exists!", &form.link);

        if let Some(_) = profile_id {
            subscribe_to_feed(profile_id.unwrap(), channel_id.unwrap(), &form.link, &pool)
                .await
                .map_err(|_| HttpResponse::InternalServerError().finish())?;
        } else {
            HttpResponse::InternalServerError().finish();
        }
    }

    Ok(HttpResponse::Ok().finish()) 
}

#[tracing::instrument(
    name = "Searching for RSS feed",
    skip(feed, pool)
)]
pub async fn rss_feed_exists(
    pool: &PgPool,
    feed: &RssFeed,
) -> Result<Option<Uuid>, sqlx::Error> {
    let result = sqlx::query!(
        r#"
        SELECT id FROM rss_feed 
        WHERE channel=$1
        "#,
        feed.channel
    )
    .fetch_one(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?;

    Ok(Some(result.id))
}

#[tracing::instrument(
    name = "Saving new RSS feed.",
    skip(feed, pool)
)]
pub async fn insert_rss_feed(
    pool: &PgPool,
    feed: &RssFeed
) -> Result<Uuid, sqlx::Error> {
    let uuid = Uuid::new_v4();

    sqlx::query!(
        r#"
        INSERT INTO rss_feed (id, title, site_link, channel, feed_desc)
        VALUES ($1, $2, $3, $4, $5)
        "#,
        uuid,
        feed.title,
        feed.site_link,
        feed.channel, 
        feed.feed_desc
    )
    .execute(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?;

    Ok(uuid)
}

#[tracing::instrument(
    name = "Subscribing to RSS feed",
    skip(profile_id, channel_id, pool),
    fields(
        profile_id,
        channel_id 
    )
)]
pub async fn subscribe_to_feed(
    profile_id: Uuid, 
    channel_id: Uuid,
    channel_url: &String,
    pool: &PgPool
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO subscription (id, profile_id, channel_id, channel_url)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(),
        profile_id,
        channel_id,
        channel_url
    )
    .execute(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query {:?}", e);
        e
    })?;

    Ok(())
}
