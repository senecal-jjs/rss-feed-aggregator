use uuid:Uuid;

pub struct RssFeed {
    pub id: Uuid,
    pub title: String,
    pub site_link: String,
    pub channel: String,
    pub feed_desc: String,
    pub topic: Vec<String>
}