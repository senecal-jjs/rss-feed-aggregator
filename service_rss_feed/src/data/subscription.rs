use uuid::Uuid;

pub struct Subscription {
    pub id: Uuid,
    pub profile_id: Uuid,
    pub channel_id: Uuid,
    pub channel_url: String,
    pub category: String 
}