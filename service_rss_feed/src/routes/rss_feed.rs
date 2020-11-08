#[derive(serde::Deserialize)]
pub struct RssFeed {
    pub title: String,
    pub link: String, 
    pub description: String,
}

