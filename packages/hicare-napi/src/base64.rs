use crate::guard::is_url::is_url;
use base64_simd::{STANDARD, URL_SAFE_NO_PAD};
use napi::bindgen_prelude::*;
use napi::{Error, Result};
use napi_derive::napi;
#[napi(js_name = "toBase64")]
pub fn to_base64(input: Buffer) -> Result<String> {
    let input_ref = input.as_ref();

    let encoded = if is_url(input_ref) {
        URL_SAFE_NO_PAD.encode_to_string(input_ref)
    } else {
        STANDARD.encode_to_string(input_ref)
    };

    Ok(encoded)
}

#[napi(js_name = "fromBase64")]
pub fn from_base64(input: Buffer) -> Result<Buffer> {
    STANDARD.decode_to_vec(input.as_ref()).map_err(|e| Error::from_reason(e.to_string())).map(|v| {
        let mut buffer = input.as_ref().to_vec();
        buffer.clear();
        buffer.extend_from_slice(&v);
        buffer.into()
    })
}
