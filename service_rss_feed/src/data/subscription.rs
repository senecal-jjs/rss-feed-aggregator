use uuid::Uuid;

pub struct Subscription {
    id: Uuid,
    profile_id: Uuid,
    channel_id: Uuid,
    channel_url: String,
    category: String 
}