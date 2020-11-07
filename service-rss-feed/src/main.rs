use service_rss_feed::startup::run; 
use service_rss_feed::configuration::get_configuration;
use service_rss_feed::telemetry::{ get_subscriber, init_subscriber };
use std::net::TcpListener;
use sqlx::postgres::PgPoolOptions;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let subscriber = get_subscriber("service_rss_feed".into(), "info".into());
    init_subscriber(subscriber);

    let configuration = get_configuration().expect("Failed to read configuration");

    let connection_pool = PgPoolOptions::new()
        .connect_timeout(std::time::Duration::from_secs(2))
        .connect_with(configuration.database.with_db())
        .await
        .expect("Failed to connect to Postgres.");

    let address = format!(
        "{}:{}", 
        configuration.application.host, configuration.application.port
    );
    let listener = TcpListener::bind(address)?;
    run(listener, connection_pool)?.await
}