use crate::{DEFAULT_ITERATIONS, DEFAULT_KEY_LENGTH};
use aes::cipher::{BlockDecryptMut, BlockEncryptMut, KeyIvInit};
use base64_simd::STANDARD;
use block_padding::Pkcs7;
use once_cell::sync::Lazy;
use pbkdf2::pbkdf2_hmac;
use sha1::Sha1;
use std::fmt;
use std::sync::Mutex;
type Aes256CbcDec = cbc::Decryptor<aes::Aes256>;
type Aes256CbcEnc = cbc::Encryptor<aes::Aes256>;

#[derive(Debug)]
struct CryptoError(String);

impl fmt::Display for CryptoError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Crypto error: {}", self.0)
    }
}

impl std::error::Error for CryptoError {}

pub struct AesDecrypt {
    buffer: Vec<u8>,
}

impl AesDecrypt {
    pub fn new() -> Self {
        Self { buffer: Vec::new() }
    }

    pub fn decrypt(
        &mut self,
        sym_key: &[u8],
        text: &[u8],
    ) -> Result<&[u8], Box<dyn std::error::Error>> {
        let iv = md5::compute(sym_key);

        let decode_base64 = STANDARD.decode_to_vec(text).map_err(|e| {
            Box::new(CryptoError(format!("Invalid base64: {:?}", e))) as Box<dyn std::error::Error>
        })?;

        if self.buffer.len() < decode_base64.len() {
            self.buffer.resize(decode_base64.len() * 4, 0);
        }

        let ct = Aes256CbcDec::new_from_slices(sym_key, iv.as_slice()).map_err(|e| {
            Box::new(CryptoError(format!("Invalid length: {:?}", e))) as Box<dyn std::error::Error>
        })?;

        let ct_dec = ct
            .decrypt_padded_b2b_mut::<Pkcs7>(
                &*decode_base64,
                &mut self.buffer[..decode_base64.len()],
            )
            .map_err(|e| {
                Box::new(CryptoError(format!("Decryption error: {:?}", e)))
                    as Box<dyn std::error::Error>
            })?;

        Ok(ct_dec)
    }

    pub fn encrypt(
        &mut self,
        sym_key: &[u8],
        text: &str,
    ) -> Result<String, Box<dyn std::error::Error>> {
        let iv = md5::compute(sym_key);

        if self.buffer.len() < text.len() {
            self.buffer.resize(text.len() * 4, 0);
        }

        let ct = Aes256CbcEnc::new_from_slices(sym_key, iv.as_slice()).map_err(|e| {
            Box::new(CryptoError(format!("Invalid length: {:?}", e))) as Box<dyn std::error::Error>
        })?;

        let ct_enc = ct
            .encrypt_padded_b2b_mut::<Pkcs7>(text.as_bytes(), &mut self.buffer)
            .map_err(|e| {
                Box::new(CryptoError(format!("Encryption error: {:?}", e)))
                    as Box<dyn std::error::Error>
            })?;

        Ok(STANDARD.encode_to_string(ct_enc))
    }
}

#[napi(object)]
pub struct KDFOption {
    pub iterations: Option<u32>,
    pub key_size: Option<u32>,
}

#[napi(js_name = "PBKDF2")]
pub fn pbkdf2(password: String, salt: String, cfg: Option<KDFOption>) -> napi::Result<String> {
    let iterations = cfg
        .as_ref()
        .and_then(|c| c.iterations)
        .unwrap_or(DEFAULT_ITERATIONS);
    let key_size = cfg
        .as_ref()
        .and_then(|c| c.key_size)
        .unwrap_or(DEFAULT_KEY_LENGTH as u32) as usize;

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
    let mut decryptor = AES_DECRYPT
        .lock()
        .map_err(|_| napi::Error::from_reason("Failed to acquire AES lock"))?;

    decryptor
        .encrypt(sym_key.as_bytes(), &text)
        .map_err(|e| napi::Error::from_reason(e.to_string()))
}

#[napi(js_name = "decryptAES")]
pub fn decrypt_aes(sym_key: String, text: String) -> napi::Result<String> {
    let mut decryptor = AES_DECRYPT
        .lock()
        .map_err(|_| napi::Error::from_reason("Failed to acquire AES lock"))?;

    let decrypted = decryptor
        .decrypt(sym_key.as_bytes(), text.as_bytes())
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    String::from_utf8(decrypted.to_vec()).map_err(|e| napi::Error::from_reason(e.to_string()))
}
