-- Add migration script here
CREATE TABLE IF NOT EXISTS rss_feed(
    id uuid NOT NULL PRIMARY KEY,
    title TEXT,
    link TEXT NOT NULL,
    feed_desc TEXT
);
