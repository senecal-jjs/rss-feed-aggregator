use actix_web::{web, App, HttpServer};
use actix_web::dev::Server; 
use std::net::TcpListener;
use crate::routes::{health_check, register};

pub fn run(listener: TcpListener) -> Result<Server, std::io::Error> {
    let server = HttpServer::new(|| {
        App::new()
            .route("/health-check", web::get().to(health_check))
            .route("/register-user", web::post().to(register))
    })
    .listen(listener)?
    .run();

    Ok(server)
}