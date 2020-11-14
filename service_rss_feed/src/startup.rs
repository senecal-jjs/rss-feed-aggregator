use actix_redis::RedisSession;
use actix_web::{web, App, HttpServer, FromRequest};
use actix_web::dev::Server; 
use crate::configuration::get_configuration;
use std::net::TcpListener;
use sqlx::PgPool;
use tracing_actix_web::TracingLogger;
use crate::routes::{health_check, register, save_feed, login};

pub fn run(
    listener: TcpListener, 
    db_pool: PgPool
) -> Result<Server, std::io::Error> {
    let db_pool = web::Data::new(db_pool);

    let config = get_configuration().expect("Failed to read configuration");
    let redis_port = config.redis.port;
    let redis_host = config.redis.host;

    let server = HttpServer::new(move || {
        App::new()
            .wrap(TracingLogger)
            .wrap(
                RedisSession::new(
                    format!("{}:{}", redis_host, redis_port),
                    &[0; 32]
                )
            )
            .app_data(String::configure(|cfg| {
                cfg.limit(4096)
            }))
            .route("/health-check", web::get().to(health_check))
//            .route("/register-user", web::post().to(register))
            .route("/save-feed", web::post().to(save_feed))
            .route("/login", web::post().to(login))
            .app_data(db_pool.clone())
    })
    .listen(listener)?
    .run();

    Ok(server)
}