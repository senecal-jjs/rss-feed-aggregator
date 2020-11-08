use actix_web::{web, App, HttpServer};
use actix_web::dev::Server; 
use std::net::TcpListener;
use sqlx::PgPool;
use tracing_actix_web::TracingLogger;
use crate::routes::{health_check, register};

pub fn run(listener: TcpListener, db_pool: PgPool) -> Result<Server, std::io::Error> {
    let db_pool = web::Data::new(db_pool);

    let server = HttpServer::new(move || {
        App::new()
            .wrap(TracingLogger)
            .route("/health-check", web::get().to(health_check))
            .route("/register-user", web::post().to(register))
            .app_data(db_pool.clone())
    })
    .listen(listener)?
    .run();

    Ok(server)
}