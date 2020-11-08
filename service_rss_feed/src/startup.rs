use actix_web::{web, App, HttpServer, FromRequest};
use actix_web::dev::Server; 
use actix_web::middleware::session::{RequestSession, SessionStorage, CookieSessionBackend};
use std::net::TcpListener;
use sqlx::PgPool;
use tracing_actix_web::TracingLogger;
use crate::routes::{health_check, register, save_feed};

pub fn run(listener: TcpListener, db_pool: PgPool) -> Result<Server, std::io::Error> {
    let db_pool = web::Data::new(db_pool);

    let server = HttpServer::new(move || {
        App::new()
            .wrap(TracingLogger)
            .app_data(String::configure(|cfg| {
                cfg.limit(4096)
            }))
            .middleware(
                SessionStorage::new(
                    CookieSessionBackend::signed(&[0; 32]).secure(false)
                )
            )
            .route("/health-check", web::get().to(health_check))
            .route("/register-user", web::post().to(register))
            .route("/save-feed", web::post().to(save_feed))
            .app_data(db_pool.clone())
    })
    .listen(listener)?
    .run();

    Ok(server)
}