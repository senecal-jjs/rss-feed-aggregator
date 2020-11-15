use actix_session::Session;
use actix_web::{HttpResponse};
use uuid::Uuid;

#[tracing::instrument(
    name = "Checking user session",
    skip(session),
    fields()
)]
pub async fn check_session(
    session: Session,
) -> Result<HttpResponse, HttpResponse> {
    let _profile_id: Option<Uuid> = session.get("profile_id")?;
    // session.get("profile_id")
    //     .map_err(|e| HttpResponse::InternalServerError().finish())?;

    Ok(HttpResponse::Ok().finish())
}