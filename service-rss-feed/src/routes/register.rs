use actix_web::{web, HttpResponse};
use chrono::Utc; 
use sqlx::PgPool;
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
    .await
    .map_err(|e| {
        eprintln!("Failed to execute query: {}", e);
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
