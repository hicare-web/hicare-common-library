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
pub fn from_base64(input: String) -> Result<Buffer> {
    // String을 바이트 슬라이스로 변환
    let input_bytes = input.as_bytes();

    // Base64 디코딩 수행
    match STANDARD.decode_to_vec(input_bytes) {
        Ok(decoded_vec) => {
            // 디코딩된 데이터를 Buffer로 변환하여 반환
            Ok(Buffer::from(decoded_vec))
        }
        Err(e) => Err(Error::from_reason(format!("Invalid base64: {:?}", e))),
    }
}
