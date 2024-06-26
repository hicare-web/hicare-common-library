#![deny(clippy::all)]

mod crypto;
mod guard;

use base64_simd::{STANDARD, URL_SAFE};
use pbkdf2::pbkdf2_hmac;
use sha1::Sha1;

use std::sync::Mutex;
use once_cell::sync::Lazy;
use crate::crypto::aes_256_cbc::AesDecrypt;
use crate::guard::is_url::is_url;


const DEFAULT_ITERATIONS: u32 = 1000;
const DEFAULT_KEY_LENGTH: usize = 64;


use mimalloc::MiMalloc;

#[global_allocator]
static GLOBAL: MiMalloc = MiMalloc;

#[napi(object)]
pub struct KDFOption {
  pub iterations: Option<u32>,
  pub key_size: Option<u32>,
}

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn parse(json_string: String) -> napi::Result<serde_json::Value> {
  serde_json::from_str(&json_string).map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi]
pub fn stringify(value: serde_json::Value) -> napi::Result<String> {
  serde_json::to_string(&value).map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi]
pub fn parse_simd(mut json_string: String) -> napi::Result<serde_json::Value> {
  let convert_string = unsafe { json_string.as_bytes_mut() };
  simd_json::from_slice(convert_string).map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi]
pub fn stringify_simd(value: serde_json::Value) -> napi::Result<String> {
  simd_json::to_string(&value).map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi]
pub fn parse_sonic(json_string: String) -> napi::Result<serde_json::Value> {
  sonic_rs::from_str(&json_string).map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi]
pub fn stringify_sonic(value: serde_json::Value) -> napi::Result<String> {
  sonic_rs::to_string(&value).map_err(|e| napi::Error::from_reason(e.to_string()))
}


#[napi]
pub fn to_base64(input: String) -> napi::Result<String> {
  if is_url(&input) {
    let encoded = URL_SAFE.encode_to_string(input.as_bytes());
    Ok(encoded)
  } else {
    let encoded = STANDARD.encode_to_string(input.as_bytes());
    Ok(encoded)
  }
}

#[napi]
pub fn from_base64(input: String) -> napi::Result<String> {
  let decoded = STANDARD.decode_to_vec(input.as_bytes())
      .map_err(|e| napi::Error::from_reason(e.to_string()))?;
  String::from_utf8(decoded)
      .map_err(|e| napi::Error::from_reason(e.to_string()))
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