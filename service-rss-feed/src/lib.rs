use actix_web::{web, App, HttpResponse, HttpServer};
use actix_web::dev::Server; 
use std::net::TcpListener; 

async fn health_check() -> HttpResponse {
    HttpResponse::Ok().finish()
}

#[derive(serde::Deserialize)]
struct FormData {
    email: String,
    name: String 
}

async fn register(_form: web::Form<FormData>) -> HttpResponse {
    HttpResponse::Ok().finish()
}

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