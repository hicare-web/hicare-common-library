#![deny(clippy::all)]

mod crypto;
mod guard;

use napi::{CallContext, JsObject, JsString, JsUnknown, Result, module_init, Env};
use serde_json::Value;
use base64_simd::{STANDARD, URL_SAFE};
use pbkdf2::pbkdf2_hmac;
use sha1::Sha1;

use std::sync::Mutex;
use once_cell::sync::Lazy;
use crate::crypto::aes_256_cbc::AesDecrypt;
use crate::guard::is_url::is_url;

use napi::bindgen_prelude::create_custom_tokio_runtime;

#[macro_use]
extern crate napi_derive;

const DEFAULT_ITERATIONS: u32 = 1000;
const DEFAULT_KEY_LENGTH: usize = 64;

#[module_init]
fn init() {
    let rt = tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .on_thread_start(|| {
            println!("tokio thread started");
        })
        .build()
        .unwrap();
    create_custom_tokio_runtime(rt);
}

#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

#[napi(object)]
pub struct KDFOption {
    pub iterations: Option<u32>,
    pub key_size: Option<u32>,
}

#[napi(js_name = "parse")]
pub fn parse(env:Env, js_string: JsString) -> Result<JsUnknown> {
    let str = js_string.into_utf8().map_err(|e| napi::Error::from_reason(e.to_string()))
        .unwrap().as_str().map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    let de_serialize: Value = serde_json::from_str(&str).map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    env.to_js_value(&de_serialize)
}

#[napi(js_name = "stringify")]
pub fn stringify(env:Env, js_object: JsObject) -> Result<JsString> {
    let serialize:Value = env.from_js_value(&js_object)
        .map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let str = serde_json::to_string(&serialize).map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    env.create_string(&str)
}

#[napi(js_name = "parseSimd")]
pub fn parse_simd(env:Env, js_string: JsString) -> Result<JsUnknown> {
    let str = js_string
        .into_utf8()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?
        .as_str()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let mut string = String::from(str);
    let bytes = unsafe { string.as_bytes_mut() };

    let de_serialize: Value = simd_json::from_slice(bytes).map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    env.to_js_value(&de_serialize)
}

#[napi(js_name = "stringifySimd")]
pub fn stringify_simd(env:Env, js_object: JsObject) -> Result<JsString> {
    let serialize:Value = env.from_js_value(&js_object)
        .map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let str = simd_json::to_string(&serialize).map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    env.create_string(&str)
}

#[napi(js_name = "parseSonic")]
pub fn parse_sonic(env:Env, js_string: JsString) -> Result<JsUnknown> {
    let str = js_string
        .into_utf8()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?
        .as_str()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let de_serialize: Value = sonic_rs::from_str(&str).map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    env.to_js_value(&de_serialize)
}

#[napi(js_name = "stringifySonic")]
pub fn stringify_sonic(env:Env, js_object: JsObject) -> Result<JsString> {
    let serialize:Value = env.from_js_value(&js_object)
        .map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let str = sonic_rs::to_string(&serialize).map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    env.create_string(&str)
}


#[napi(js_name = "toBase64")]
pub fn to_base64(env:Env, js_string: JsString) -> Result<JsString> {
    let input = js_string
        .into_utf8()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?
        .as_str()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    if is_url(&input) {
        let encoded = URL_SAFE.encode_to_string(input.as_bytes());

        env.create_string(&encoded)
    } else {
        let encoded = STANDARD.encode_to_string(input.as_bytes());

        env.create_string(&encoded)
    }
}

#[napi(js_name = "fromBase64")]
pub fn from_base64(env:Env, js_string: JsString) -> Result<JsString> {
    let input = js_string
        .into_utf8()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?
        .as_str()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    let decoded = STANDARD.decode_to_vec(input.as_bytes())
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    let decoded = String::from_utf8(decoded).map_err(|e| napi::Error::from_reason(e.to_string())).unwrap();

    env.create_string(&decoded)
}

#[napi(js_name = "PBKDF2")]
pub fn pbkdf2(password: String, salt: String, cfg: Option<KDFOption>) -> napi::Result<String> {
    let iterations = cfg.as_ref().and_then(|c| c.iterations).unwrap_or(DEFAULT_ITERATIONS);
    let key_size = cfg.as_ref().and_then(|c| c.key_size).unwrap_or(DEFAULT_KEY_LENGTH as u32) as usize;

    let mut result = vec![0u8; key_size];
    pbkdf2_hmac::<Sha1>(
        password.as_bytes(),
        salt.as_bytes(),
        iterations,
        &mut result,
    );

    Ok(STANDARD.encode_to_string(&result))
}


static AES_DECRYPT: Lazy<Mutex<AesDecrypt>> = Lazy::new(|| Mutex::new(AesDecrypt::new()));

#[napi(js_name = "encryptAES")]
pub fn encrypt_aes(sym_key: String, text: String) -> napi::Result<String> {
    let mut decryptor = AES_DECRYPT.lock().map_err(|_| napi::Error::from_reason("Failed to acquire AES lock"))?;

    decryptor.encrypt(sym_key.as_bytes(), &text)
        .map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi(js_name = "decryptAES")]
pub fn decrypt_aes(sym_key: String, text: String) -> napi::Result<String> {
    let mut decryptor = AES_DECRYPT.lock().map_err(|_| napi::Error::from_reason("Failed to acquire AES lock"))?;

    let decrypted = decryptor.decrypt(sym_key.as_bytes(), text.as_bytes())
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    String::from_utf8(decrypted.to_vec())
        .map_err(|e| napi::Error::from_reason(e.to_string()))
}


#[inline]
fn ctx_to_js_string(ctx: &CallContext) -> String {
    let arg0 = ctx.get::<JsString>(0)
        .map_err(|e| napi::Error::from_reason(e.to_string()))
        .unwrap()
        .into_utf8()
        .map_err(|e| napi::Error::from_reason(e.to_string()))
        .unwrap();

    arg0.as_str()
        .map_err(|e| napi::Error::from_reason(e.to_string()))
        .map(|s| s.to_owned())
        .unwrap()
}

#[inline]
fn ctx_to_js_object(ctx: &CallContext) -> Value {
    let arg0 = ctx.get::<JsObject>(0)
        .map_err(|e| napi::Error::from_reason(e.to_string()))
        .unwrap();

    ctx.env.from_js_value(&arg0).map_err(|e| napi::Error::from_reason(e.to_string()))
        .map_err(|e| napi::Error::from_reason(e.to_string())).unwrap()
}
