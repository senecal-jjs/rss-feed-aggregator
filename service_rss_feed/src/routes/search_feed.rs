use actix_web::{web, HttpResponse};
use sqlx::PgPool;

#[derive(serde::Deserialize)]
struct SearchTerm {
    search_term: String,
}

#[tracing::instrument(
    name = "Searching feeds",
    skip(form, pool, session),
    fields(
        search_term 
    )
)]
pub async fn search_feeds(search_term: web::Query<SearchTerm>) -> Result<HttpResponse, HttpResponse> {

}