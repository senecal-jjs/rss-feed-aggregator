-- Add migration script here
CREATE TABLE IF NOT EXISTS rss_feed(
    id uuid NOT NULL PRIMARY KEY,
    title TEXT,
    site_link TEXT NOT NULL,
    channel TEXT NOT NULL, 
    feed_desc TEXT
    topic JSONB
);
