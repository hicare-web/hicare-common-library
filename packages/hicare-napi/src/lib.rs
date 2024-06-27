#![deny(clippy::all)]

mod crypto;
mod guard;
mod base64;
mod utils;
mod uuid;
mod jwt;

use napi::{module_init};

use napi::bindgen_prelude::{create_custom_tokio_runtime};

#[macro_use]
extern crate napi_derive;

const DEFAULT_ITERATIONS: u32 = 1000;
const DEFAULT_KEY_LENGTH: usize = 64;

#[module_init]
fn init() {
    let rt = tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        // .on_thread_start(|| {
        //     println!("tokio thread started");
        // })
        .build()
        .unwrap();
    create_custom_tokio_runtime(rt);
}

#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;
