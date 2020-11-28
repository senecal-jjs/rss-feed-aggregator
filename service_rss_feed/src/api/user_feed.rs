use rss::Item;
use rss::Channel;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct UserSubscription {
    pub feeds: Vec<Feed>
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct Feed {
    pub category: String,
    pub channels: Vec<RssChannel>
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct RssChannel {
    pub channel: Channel,
    pub items: Vec<Item>
}
