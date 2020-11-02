#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

use rocket_contrib::databases::diesel; 

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/hello")]
fn hello() -> &'static str {
    "Hello, Jacob!"
}

#[database("postgres_dev")]
struct PgDbConn(diesel::PgConnection);

fn main() {
    rocket::ignite()
        .attach(PgDbConn::fairing())
        .mount("/", routes![index, hello])
        .launch();
}
