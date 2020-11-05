use service_rss_feed::startup::run; 
use service_rss_feed::configuration::get_configuration;
use std::net::TcpListener;
use sqlx::{ Connection, PgConnection };

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let configuration = get_configuration().expect("Failed to read configuration") ;
    let conn = PgConnection::connect(&configuration.database.connection_string())
        .await
        .expect("Failed to connect to Postgres.");
    let address = format!("127.0.0.1:{}", configuration.application_port);
    // Bubble up the io::Error if we failed to bind the address
    // Otherwise call .await on our Server
    let listener = TcpListener::bind(address)?;
    run(listener, conn)?.await
}