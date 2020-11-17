use chrono::{DateTime, Utc};
use uuid::Uuid;

pub struct Profile {
    pub id: Uuid,
    pub email: String,
    pub pass_hash: String,
    pub registered_at: DateTime<Utc>
}