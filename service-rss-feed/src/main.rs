#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/hello")]
fn hello() -> &'static str {
    "Hello, Jacob!"
}

fn main() {
    rocket::ignite().mount("/", routes![index, hello]).launch();
}
