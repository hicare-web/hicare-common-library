use aes::cipher::{BlockDecryptMut, BlockEncryptMut, KeyIvInit};
use base64_simd::STANDARD;
use block_padding::{Pkcs7};
use std::fmt;
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

    pub fn decrypt(&mut self, sym_key: &[u8], text: &[u8]) -> Result<&[u8], Box<dyn std::error::Error>> {
        let iv = md5::compute(sym_key);

        let decode_base64 = STANDARD.decode_to_vec(text).map_err(|e| Box::new(CryptoError(format!("Invalid base64: {:?}", e))) as Box<dyn std::error::Error>)?;

        if self.buffer.len() < decode_base64.len() {
            self.buffer.resize(decode_base64.len() * 4 , 0);
        }

        let ct = Aes256CbcDec::new_from_slices(sym_key, iv.as_slice())
            .map_err(|e| Box::new(CryptoError(format!("Invalid length: {:?}", e))) as Box<dyn std::error::Error>)?;

        let ct_dec = ct.decrypt_padded_b2b_mut::<Pkcs7>(&*decode_base64, &mut self.buffer[..decode_base64.len()])
            .map_err(|e| Box::new(CryptoError(format!("Decryption error: {:?}", e))) as Box<dyn std::error::Error>)?;

        Ok(ct_dec)
    }

    pub fn encrypt(&mut self, sym_key: &[u8], text: &str) -> Result<String, Box<dyn std::error::Error>> {
        let iv = md5::compute(sym_key);

        if self.buffer.len() < text.len() {
            self.buffer.resize(text.len() * 4, 0);
        }

        let ct = Aes256CbcEnc::new_from_slices(sym_key, iv.as_slice())
            .map_err(|e| Box::new(CryptoError(format!("Invalid length: {:?}", e))) as Box<dyn std::error::Error>)?;

        let ct_enc = ct.encrypt_padded_b2b_mut::<Pkcs7>(text.as_bytes(), &mut self.buffer)
            .map_err(|e| Box::new(CryptoError(format!("Encryption error: {:?}", e))) as Box<dyn std::error::Error>)?;

        Ok(STANDARD.encode_to_string(ct_enc))
    }
}