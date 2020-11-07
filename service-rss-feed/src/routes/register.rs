use actix_web::{web, HttpResponse};
use chrono::Utc; 
use sqlx::PgPool;
use tracing_futures::Instrument; 
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct FormData {
    email: String,
    name: String,
}

pub async fn register(
    form: web::Form<FormData>,
    pool: web::Data<PgPool>
) -> Result<HttpResponse, HttpResponse> {
    let request_id = Uuid::new_v4();

    // tracing spans use key value pairs 
    let request_span = tracing::info_span!(
        "Adding new profile",
        %request_id,
        email = %form.email,
        name = %form.name 
    );

    let _request_span_guard = request_span.enter();

    let query_span = tracing::info_span!(
        "Saving new profile in the database"
    );

    sqlx::query!(
        r#"
        INSERT INTO profile (id, email, name, registered_at)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(),
        form.email,
        form.name,
        Utc::now()
    )
    .execute(pool.get_ref())
    .instrument(query_span)
    .await
    .map_err(|e| {
        tracing::error!("Request ID {} - Failed to execute query: {:?}", request_id, e);
        HttpResponse::InternalServerError().finish()
    })?;

    // There is a bit of cerenomy here to get our hands on a &PgConnection.
    // web::Data<Arc<PgConnection>> is equivalent to Arc<Arc<PgConnection>>
    // Therefore connection.get_ref() returns a &Arc<PgConnection> 
    // which we can then deref to a &PgConnection.
    // We could have avoided the double Arc wrapping using .app_data()
    // instead of .data() in src/startup.rs

    Ok(HttpResponse::Ok().finish())
}
