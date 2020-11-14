use actix_session::Session;
use actix_web::{web, HttpResponse};
use chrono::{Utc};
use sqlx::PgPool;
use uuid::Uuid;

use crate::api::{LoginForm};
use crate::data::{Profile};

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
    let profile_exists = does_profile_exist(&form.email, &pool)
        .await
        .map_err(|_| {
            HttpResponse::InternalServerError().finish()
        })?;

    if profile_exists {
        let profile = find_profile(&pool, &form.email)
            .await
            .map_err(|_| {
                HttpResponse::InternalServerError().finish()
            })?;

        if check_pass_hash(&profile.pass_hash, &form.password).is_ok() {
            set_session(&profile.id, &session)
                .map_err(|_| HttpResponse::InternalServerError().finish())?;

            Ok(HttpResponse::Ok().finish())
        } else {
            Err(HttpResponse::InternalServerError().finish())
        }
    } else {
        let profile = register(&form, &pool)
            .await
            .map_err(|_| HttpResponse::InternalServerError().finish())?;
        
        set_session(&profile.id, &session)
            .map_err(|_| HttpResponse::InternalServerError().finish())?;

        Ok(HttpResponse::Ok().finish())
    }
}

fn set_session(profile_id: &Uuid, session: &Session) -> Result<(), actix_web::Error> {
    tracing::info!("Setting session id for profile {}", profile_id);
    session.set("profile_id", profile_id)?;
    session.renew();
    Ok(())
}

fn check_pass_hash(incoming_pass_hash: &str, db_pass_hash: &str) -> Result<(), ()> {
    if incoming_pass_hash == db_pass_hash {
        Ok(())
    } else {
        Err(())
    }
}

#[tracing::instrument(
    name = "Check profile exists",
    skip(pool, email)
)]
pub async fn does_profile_exist(email: &str, pool: &PgPool) -> Result<bool, sqlx::Error> {
    let record = sqlx::query!(
        r#"
        SELECT COUNT(*) FROM profile
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

    match record.count {
        None => Ok(false),
        Some(count) => {
            if count > 0 {
                Ok(true)
            } else {
                Ok(false)
            }
        }
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
) -> Result<Profile, sqlx::Error> {
    insert_profile(&form, &pool)
        .await?;

    let profile = find_profile(pool, &form.email)
        .await?;

    Ok(profile)
}

#[tracing::instrument(
    name = "Saving new profile in database",
    skip(form, pool)
)]
pub async fn insert_profile(
    form: &LoginForm,
    pool: &PgPool
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
