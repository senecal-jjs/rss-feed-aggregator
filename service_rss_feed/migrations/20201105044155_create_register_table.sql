CREATE TABLE IF NOT EXISTS profile(
    id uuid NOT NULL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, 
    registered_at timestamptz NOT NULL
);
