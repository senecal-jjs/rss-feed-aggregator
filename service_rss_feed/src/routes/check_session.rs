use actix_session::Session;
use actix_web::{HttpResponse};
use uuid::Uuid;

use crate::api::{UserSession};

#[tracing::instrument(
    name = "Checking user session",
    skip(session),
    fields()
)]
pub async fn check_session(
    session: Session,
) -> Result<HttpResponse, HttpResponse> {
    let profile_id: Option<Uuid> = session.get("profile_id")?;

    let profile_id = match profile_id {
        Some(id) => id.to_string(),
        None => String::new()
    };

    Ok(HttpResponse::Ok().json(
        UserSession {
            profile_id: profile_id
        }
    ))
}