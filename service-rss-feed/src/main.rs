use service_rss_feed::run; 

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    run().await
}