use actix_web::{web, HttpResponse};
use chrono::Datetime;
use sqlx::PgPool;

#[derive(serde::Deserialize)]
pub struct LoginForm {
    username: String,
    password: String 
}

#[derive(serde::Deserialize)]
pub struct Profile {
    id: Uuid,
    email: String,
    password: String,
    registered_at: Datetime,
}

#[tracing::instrument(
    name = "Logging in user",
    skip(form, pool),
    fields(
        email = %form.email,
        password = %form.password
    )
)]
pub aysnc fn login(
    form: web::Form<LoginForm>,
    pool: web::Data<PgPool>
) -> Result<HttpResponse, HttpResponse> {

}

pub async fn find_profile(pool: &PgPool, email: &str) -> Result<Profile, sqlx::Error> {
    let profile = sqlx::query!(
        r#"
        SELECT (id, email, password, registered_at) 
        FROM profile
        WHERE email=$1
        "#,
        email 
    )
    .fetch_one(pool)
    .await 
    .map_err(|e| {
        tracing::error!("Failed to execute query {}", e);
        e
    })?;

    Ok(
        Profile {
            
        }
    )
}

