use actix_session::Session;
use actix_web::{web, HttpResponse};
use chrono::{DateTime, Utc};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct LoginForm {
    email: String,
    password: String 
}

pub struct Profile {
    id: Uuid,
    email: String,
    pass_hash: String,
    registered_at: DateTime<Utc>
}

#[tracing::instrument(
    name = "Logging in user",
    skip(form, pool, session),
    fields(
        email = %form.email,
        password = %form.password
    )
)]
pub async fn login(
    form: web::Form<LoginForm>,
    session: Session,
    pool: web::Data<PgPool>
) -> Result<HttpResponse, HttpResponse> {
    let profile = find_profile(&pool, &form.email)
        .await
        .map_err(|_| HttpResponse::InternalServerError().finish())?;

    if profile.pass_hash == form.password {
        tracing::info!("Setting session id for profile {}", form.email);
        session.set("profile_id", profile.id)?;
        session.renew();

        Ok(HttpResponse::Ok().finish())
    } else {
        Err(HttpResponse::InternalServerError().finish())
    }
}

#[tracing::instrument(
    name = "Searching for profile",
    skip(pool, email)
)]
pub async fn find_profile(pool: &PgPool, email: &str) -> Result<Profile, sqlx::Error> {
    let profile = sqlx::query_as!(
        Profile,
        r#"
        SELECT * FROM profile
        WHERE email=$1
        "#,
        email 
    )
    .fetch_one(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query {:?}", e);
        e
    })?;

    Ok(profile)
}

