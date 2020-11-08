CREATE TABLE IF NOT EXISTS subscription(
    id uuid NOT NULL PRIMARY KEY, 
    profile_id uuid NOT NULL,
    feed_id uuid NOT NULL 
);