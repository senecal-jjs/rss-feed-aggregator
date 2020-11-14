use actix_web::{web, HttpResponse};
use chrono::Utc; 
use sqlx::PgPool;
use uuid::Uuid;

use super::login::LoginForm;

#[derive(serde::Deserialize)]
pub struct FormData {
    email: String,
    password: String,
}

#[tracing::instrument(
    name = "Adding new profile",
    skip(form, pool),
    fields(
        email = %form.email,
        password = %form.password
    )
)]
pub async fn register(
    form: &LoginForm,
    pool: &PgPool
) -> Result<HttpResponse, HttpResponse> {
    insert_subscriber(&pool, &form)
        .await
        .map_err(|_| HttpResponse::InternalServerError().finish())?;

    Ok(HttpResponse::Ok().finish())
}

#[tracing::instrument(
    name = "Saving new profile in database",
    skip(form, pool)
)]
pub async fn insert_subscriber(
    pool: &PgPool,
    form: &LoginForm
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO profile (id, email, pass_hash, registered_at)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(),
        form.email,
        form.password,
        Utc::now()
    )
    .execute(pool)
    .await
    .map_err(|e| {
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?;

    Ok(())
}
