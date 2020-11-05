use service_rss_feed::startup::run; 
use service_rss_feed::configuration::get_configuration;
use std::net::TcpListener;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let configuration = get_configuration().expect("Failed to read configuration") ;

    // Bubble up the io::Error if we failed to bind the address
    // Otherwise call .await on our Server
    let address = TcpListener::bind("127.0.0.1:8000")?;
    run(address)?.await
}