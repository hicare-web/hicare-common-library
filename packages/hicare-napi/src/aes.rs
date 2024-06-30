use base64_simd::STANDARD;
use block_padding::Pkcs7;
use lazy_static::lazy_static;
use std::sync::{Arc, Mutex};
use napi::{Result};
use aes::cipher::{BlockDecryptMut, BlockEncryptMut, KeyIvInit};
use once_cell::sync::Lazy;

type Aes256CbcDec = cbc::Decryptor<aes::Aes256>;
type Aes256CbcEnc = cbc::Encryptor<aes::Aes256>;


struct AesCacheData {
    key_slice: Vec<u8>,
    iv_slice: Vec<u8>,
    key: String,
}


lazy_static! {
    static ref CACHED_AES_KEY: Lazy<Arc<Mutex<AesCacheData>>> = Lazy::new(|| {
        Arc::new(Mutex::new(AesCacheData {
            key_slice: Vec::new(),
            iv_slice: Vec::new(),
            key: String::new(),
        }))
    });
}

fn aes_cbc_256_dec(iv: &[u8], key: &[u8], text: &[u8]) -> Result<String> {
    let decode_base64 = if let Ok(decode_base64) = STANDARD.decode_to_vec(text) {
        decode_base64
    } else {
        return Err(napi::Error::from_reason("Failed to decode base64"));
    };

    let ct = if let Ok(ct) = Aes256CbcDec::new_from_slices(key, &iv) {
        ct
    } else {
        return Err(napi::Error::from_reason("Failed to create decryptor"));
    };

    let mut buffer = vec![0u8; decode_base64.len() * 4];
    if let Ok(ct_dec) = ct.decrypt_padded_b2b_mut::<Pkcs7>(
        &*decode_base64,
        &mut buffer,
    ) {
        if let Ok(dec_text) = String::from_utf8(ct_dec.to_vec()) {
            Ok(dec_text)
        } else {
            Err(napi::Error::from_reason("Failed to convert to utf8"))
        }
    } else {
        Err(napi::Error::from_reason("Failed to decrypt"))
    }
}

fn aes_cbc_256_enc(iv: &[u8], key: &[u8], text: &str) -> Result<String> {
    let ct = if let Ok(ct) = Aes256CbcEnc::new_from_slices(key, &iv) {
        ct
    } else {
        return Err(napi::Error::from_reason("Failed to create encryptor"));
    };
    let mut buffer = vec![0u8; text.len() * 4];
    if let Ok(ct_enc) = ct.encrypt_padded_b2b_mut::<Pkcs7>(text.as_bytes(), &mut buffer) {
        Ok(STANDARD.encode_to_string(ct_enc))
    } else {
        Err(napi::Error::from_reason("Failed to encrypt"))
    }
}

#[napi(js_name = "encryptAESCached")]
pub fn encrypt_aes_cached(sym_key: String, text: String) -> Result<String> {
    if let Ok(mut cache_data) = CACHED_AES_KEY.lock() {
        if cache_data.key != sym_key {
            cache_data.key = sym_key.clone();
            cache_data.key_slice = sym_key.as_bytes().to_vec();

            let iv_key = md5::compute(cache_data.key_slice.as_slice());
            cache_data.iv_slice = iv_key.as_slice().to_vec();
        }
        aes_cbc_256_enc(&cache_data.iv_slice, &cache_data.key_slice.as_slice(), text.as_str())
            .map_err(|e| {
                napi::Error::from_reason(format!("Failed to encrypt: {}", e))
            })
    } else {
        Err(napi::Error::from_reason("Failed to lock cache"))
    }
}

#[napi(js_name = "decryptAESCached")]
pub fn decrypt_aes_cached(sym_key: String, text: String) -> Result<String> {
    if let Ok(mut cache_data) = CACHED_AES_KEY.lock() {
        if cache_data.key != sym_key {
            cache_data.key = sym_key.clone();
            cache_data.key_slice = sym_key.as_bytes().to_vec();

            let iv_key = md5::compute(cache_data.key_slice.as_slice());
            cache_data.iv_slice = iv_key.as_slice().to_vec();
        }
        aes_cbc_256_dec(&cache_data.iv_slice, &cache_data.key_slice.as_slice(), text.as_bytes())
    } else {
        Err(napi::Error::from_reason("Failed to lock cache"))
    }
}