use actix_web::{web, HttpResponse};
use rss::Channel;
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct RssForm {
    link: String, 
}

#[derive(serde::Deserialize)]
pub struct RssFeed {
    channel: String, 
    title: String,
    feed_desc: String,
    site_link: String,
}

#[tracing::instrument(
    name = "Adding new RSS feed",
    skip(form, pool),
    fields(
        feed_link = %form.link
    )
)]
pub async fn save_feed(
    form: web::Form<RssForm>,
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

    insert_rss_feed(&pool, &rss_feed)
        .await
        .map_err(|_| HttpResponse::InternalServerError().finish())?;

    Ok(HttpResponse::Ok().finish()) 
}

#[tracing::instrument(
    name = "Saving new RSS feed.",
    skip(feed, pool)
)]
pub async fn insert_rss_feed(
    pool: &PgPool,
    feed: &RssFeed
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO rss_feed (id, title, site_link, channel, feed_desc)
        VALUES ($1, $2, $3, $4, $5)
        "#,
        Uuid::new_v4(),
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

    Ok(())
}