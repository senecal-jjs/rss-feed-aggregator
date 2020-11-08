use actix_web::{web, HttpResponse};
use rss::Channel;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct RssFeed {
    pub title: String,
    pub link: String, 
    pub description: String,
}

#[tracing::instrument(
    name = "Adding new RSS feed",
    skip(feed_link, pool),
    fields(
        feed_link = %feed_link
    )
)]
pub async fn save_feed(
    feed_link: String,
    pool: web::Data<PgPool>
) -> Result<HttpResponse, HttpResponse> {
    let channel = Channel::from_url(&feed_link)
        .map_err(|_| HttpResponse::InternalServerError().finish())?;

    insert_rss_feed(&pool, &channel)
        .await
        .map_err(|_| HttpResponse::InternalServerError().finish())?;

    Ok(HttpResponse::Ok().finish()) 
}

#[tracing::instrument(
    name = "Saving new RSS feed.",
    skip(channel, pool)
)]
pub async fn insert_rss_feed(
    pool: &PgPool,
    channel: &Channel
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO rss_feed (id, title, link, feed_desc)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(),
        channel.title(),
        channel.link(),
        channel.description()
    )
    .execute(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?;

    Ok(())
}