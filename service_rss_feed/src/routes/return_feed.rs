// #[tracing::instrument](
//     name = "Finding subscribed feeds",
//     skip(pool, session)
// )]
// pub async fn get_subscribed_feeds(
//     session: Session,
//     pool: web::Data<PgPool>
// ) -> Result<HttpResponse, HttpResponse> {
//     let profile_id: Option<Uuid> = session.get("profile_id")?;


// }

// pub async fn find_feeds_for_profile(profile_id: Uuid) -> Result<Vec<Uuid>, sqlx::Error> {
//     let result = sqlx::query!(
//         r#"
//         SELECT feed_id FROM subscription 
//         WHERE profile_id=$1
//         "#,
//         profile_id
//     )
//     .fetch(pool)
//     .await 
//     .map_err(|e| {
//         tracing::error!("Failed to execute query: {:?}", e);
//         e
//     })?

//     Ok(result)
// }