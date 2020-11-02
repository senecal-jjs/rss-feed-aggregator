CREATE TABLE IF NOT EXISTS rss_feed (
    id UUID PRIMARY KEY,
    title VARCHAR,
    link VARCHAR,
    feed_description TEXT 
);