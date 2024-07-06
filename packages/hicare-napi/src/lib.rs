#![deny(clippy::all)]

mod base64;
mod crypto;
mod guard;
mod jwt;
mod utils;
mod uuid;
mod aes;

use napi::module_init;
use napi::bindgen_prelude::create_custom_tokio_runtime;

#[macro_use]
extern crate napi_derive;

const DEFAULT_ITERATIONS: u32 = 1000;
const DEFAULT_KEY_LENGTH: usize = 16;

#[module_init]
fn init() {
    let rt = tokio::runtime::Builder::new_multi_thread()
        .worker_threads(1)
        .enable_all()
        // .on_thread_start(|| {
        //     println!("tokio thread started");
        // })
        .build()
        .unwrap();

    create_custom_tokio_runtime(rt);

    uuid::init_queue();
}

#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;
