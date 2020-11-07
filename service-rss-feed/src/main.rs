use service_rss_feed::startup::run; 
use service_rss_feed::configuration::get_configuration;
use service_rss_feed::telemetry::{ get_subscriber, init_subscriber };
use std::net::TcpListener;
use sqlx::PgPool;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let subscriber = get_subscriber("service_rss_feed".into(), "info".into());
    init_subscriber(subscriber);

    let configuration = get_configuration().expect("Failed to read configuration") ;
    let connection_pool = PgPool::connect(&configuration.database.connection_string())
        .await
        .expect("Failed to connect to Postgres.");

    let address = format!("127.0.0.1:{}", configuration.application_port);
    let listener = TcpListener::bind(address)?;
    run(listener, connection_pool)?.await
}