use rss::Item;

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
    pub title: String,
    pub link: String,
    pub description: String,
    pub pub_date: String,
    pub last_build_date: String,
    pub image_url: String,
    pub items: Vec<RssItem>
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct RssItem {
    title: String,
    link: String,
    author: String,
    description: String,
    pub_date: String,
    content: String,
}

pub trait ItemConverter {
    fn to_response(&mut self) -> RssItem;
}

impl ItemConverter for Item {
    fn to_response(&mut self) -> RssItem {
        RssItem {
            title: self.title().unwrap_or_default().to_string(),
            link: self.link().unwrap_or_default().to_string(),
            author: self.author().unwrap_or_default().to_string(),
            description: self.description().unwrap_or_default().to_string(),
            pub_date: self.pub_date().unwrap_or_default().to_string(),
            content: self.content().unwrap_or_default().to_string()
        }
    }
}