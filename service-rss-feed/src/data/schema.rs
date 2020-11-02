table! {
    rss_feed (id) {
        id -> Uuid,
        title -> Nullable<Varchar>,
        link -> Nullable<Varchar>,
        feed_description -> Nullable<Text>,
    }
}
