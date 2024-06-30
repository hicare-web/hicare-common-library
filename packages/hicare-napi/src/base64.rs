use crate::guard::is_url::is_url;
use base64_simd::{STANDARD, URL_SAFE_NO_PAD};
use napi::bindgen_prelude::*;
use napi::{Error, Result};
use napi_derive::napi;
#[napi(js_name = "toBase64")]
pub fn to_base64(input: String) -> Result<String> {
    let input_ref = input.as_bytes();

    let encoded = if is_url(input_ref) {
        URL_SAFE_NO_PAD.encode_to_string(input_ref)
    } else {
        STANDARD.encode_to_string(input_ref)
    };

    Ok(encoded)
}

#[napi(js_name = "fromBase64")]
pub fn from_base64(input: String) -> Result<String> {
    STANDARD.decode_to_vec(input.as_bytes())
        .map_err(|e| Error::new(Status::InvalidArg, format!("Failed to decode base64, {}", e)))
        .and_then(|v| String::from_utf8(v).
            map_err(|e| Error::new(Status::InvalidArg, format!("Failed to decode base64, {}", e))))
}
