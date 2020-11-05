use actix_web::{web, App, HttpServer};
use actix_web::dev::Server; 
use std::net::TcpListener;
use std::sync::Arc;
use sqlx::PgConnection;
use crate::routes::{health_check, register};

pub fn run(listener: TcpListener, conn: PgConnection) -> Result<Server, std::io::Error> {
    let conn = Arc::new(conn);

    let server = HttpServer::new(move || {
        App::new()
            .route("/health-check", web::get().to(health_check))
            .route("/register-user", web::post().to(register))
            .data(conn.clone())
    })
    .listen(listener)?
    .run();

    Ok(server)
}