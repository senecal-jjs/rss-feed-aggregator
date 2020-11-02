use super::schema:rss_feed;
// use rocket_contrib::uuid::Uuid; 

use diesel;
use diesel::prelude::*;
use diesel::result::Error; 
use uuid::Uuid;

#[derive(Queryable, Insertable, AsChangeSet, Serialize, Deserialize)]
#[table_name = "rss_feed"]
pub struct RssFeed {
    pub id: Uuid;
    pub title: String,
    pub link: String,
    pub feed_description: String,
}

impl RssFeed {
    pub fn create(rss_feed: &RssFeed, conn: &diesel::PgConnection) {
        diesel::insert_into(rss_feed::table)
            .values(rss_feed)
            .execute(conn)
            .expect("Error creating new rss feed.");
    }

    pub fn read_by_id(id: Uuid, conn: &diesel::PgConnection) -> Result<RssFeed, Error> {
        let rss_feed = rss_feed::table
            .find(id)
            .get_result::<RssFeed>(conn)?;

        Ok(rss_feed)
    }

    pub fn update(id: Uuid, rss_feed: &RssFeed, conn: &PgConnection) -> bool {
        diesel::update(rss_feed::table.find(id))
        .set(rss_feed)
        .execute(conn)
        .is_ok()
    }
}
