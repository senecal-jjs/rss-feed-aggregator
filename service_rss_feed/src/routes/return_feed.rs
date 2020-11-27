use actix_session::Session;
use actix_web::{web, HttpResponse};
use rss::Channel;
use sqlx::PgPool;
use uuid::Uuid

#[tracing::instrument](
    name = "Finding subscribed feeds",
    skip(pool, session)
)]
pub async fn get_subscribed_feeds(
    session: Session,
    pool: web::Data<PgPool>
) -> Result<HttpResponse, HttpResponse> {
    let profile_id: Option<Uuid> = session.get("profile_id")?;

    let feed_ids = get_feeds_for_profile(profile_id, &pool)
        .await
        .unwrap_or_else(|_| { None });

    let feed_channels = match feed_ids {
        Ok(ids) => ids
            .into_iter()
            .map(|feed_id| get_feed_channel(feed_id, &pool)),

        Err(e) => return HttpResponse::InternalServerError().finish()
    };

    let rss_channels = match feed_channels {
        Ok(urls) => urls
            .map(|url| Channel::from_url(url).map_err(|_| HttpResponse::InternalServerError().finish())?),

        Err(e) => return HttpResponse::InternalServerError().finish()
    }

    
}

pub async fun get_feed_channel(feed_id: Uuid, pool: &PgPool) -> Result<Vec<String>, sqlx::Error> {
    let channels = sqlx::query!(
        r#"
        SELECT channel FROM rss_feed
        WHERE id=$1
        "#,
        feed_id
    )
    .fetch_all(pool)
    .await
    .map_err(|e| {
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?

    Ok(
        channels.into_iter()
            .map(|result| result.channel)
            .collect()
    )
} 

pub async fn get_feeds_for_profile(profile_id: Uuid, pool: &PgPool) -> Result<Vec<Uuid>, sqlx::Error> {
    let feeds = sqlx::query!(
        r#"
        SELECT feed_id FROM subscription 
        WHERE profile_id=$1
        "#,
        profile_id
    )
    .fetch_all(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?

    Ok(
        feeds.into_iter()
            .map(|feed| feed.feed_id)
            .collect()
    )
}
