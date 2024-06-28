use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
    #[serde(flatten)]
    additional: std::collections::HashMap<String, Value>,
}

#[napi(object)]
#[derive(Clone, Default)]
pub struct JwtSignOptions {
    pub expires_in: Option<String>,
    pub algorithm: Option<String>,
}

#[napi(object)]
#[derive(Clone, Default)]
pub struct JwtVerifyOptions {
    pub algorithms: Option<Vec<String>>,
}

#[napi(object)]
#[derive(Clone, Default)]
pub struct JwtModuleOptions {
    pub sign_options: Option<JwtSignOptions>,
    pub secret: Option<String>,
    pub public_key: Option<String>,
    pub private_key: Option<String>,
    pub verify_options: Option<JwtVerifyOptions>,
}

#[napi]
pub struct JwtService {
    options: JwtModuleOptions,
}

#[napi]
impl JwtService {
    #[napi(constructor)]
    pub fn new(options: JwtModuleOptions) -> Self {
        JwtService { options }
    }

    #[napi]
    pub fn sign(&self, payload: String, options: Option<JwtSignOptions>) -> napi::Result<String> {
        let mut claims: Claims = serde_json::from_str(&payload)
            .map_err(|e| Error::new(Status::InvalidArg, format!("Invalid payload: {}", e)))?;

        let sign_options = options
            .or_else(|| self.options.sign_options.clone())
            .unwrap_or_default();

        if let Some(expires_in) = sign_options.expires_in {
            let duration = parse_duration(&expires_in)?;
            claims.exp = std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?
                .as_secs() as usize
                + duration as usize;
        }

        let secret = self
            .options
            .secret
            .as_ref()
            .ok_or_else(|| Error::new(Status::GenericFailure, "No secret provided"))?;

        let algorithm = sign_options
            .algorithm
            .map(|a| parse_algorithm(&a))
            .transpose()?
            .unwrap_or(Algorithm::HS256);

        let token = encode(
            &Header::new(algorithm),
            &claims,
            &EncodingKey::from_secret(secret.as_bytes()),
        )
        .map_err(|e| Error::new(Status::GenericFailure, format!("JWT signing failed: {}", e)))?;

        Ok(token)
    }

    #[napi]
    pub fn verify(&self, token: String) -> napi::Result<String> {
        let secret = self
            .options
            .secret
            .as_ref()
            .ok_or_else(|| Error::new(Status::GenericFailure, "No secret provided"))?;

        let mut validation = Validation::default();
        if let Some(verify_options) = &self.options.verify_options {
            if let Some(algorithms) = &verify_options.algorithms {
                validation.algorithms = algorithms
                    .iter()
                    .map(|a| parse_algorithm(a))
                    .collect::<Result<Vec<_>, _>>()?;
            }
        }

        let token_data = decode::<Claims>(
            &token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &validation,
        )
        .map_err(|e| {
            Error::new(
                Status::GenericFailure,
                format!("JWT verification failed: {}", e),
            )
        })?;

        let verified_claims = serde_json::to_string(&token_data.claims).map_err(|e| {
            Error::new(
                Status::GenericFailure,
                format!("JSON serialization failed: {}", e),
            )
        })?;

        Ok(verified_claims)
    }

    #[napi]
    pub fn decode(&self, token: String) -> napi::Result<String> {
        let mut validation = Validation::default();
        validation.insecure_disable_signature_validation();

        let token_data = decode::<Claims>(&token, &DecodingKey::from_secret(&[]), &validation)
            .map_err(|e| {
                Error::new(
                    Status::GenericFailure,
                    format!("JWT decoding failed: {}", e),
                )
            })?;

        let decoded_claims = serde_json::to_string(&token_data.claims).map_err(|e| {
            Error::new(
                Status::GenericFailure,
                format!("JSON serialization failed: {}", e),
            )
        })?;

        Ok(decoded_claims)
    }
}

fn parse_duration(duration: &str) -> napi::Result<u64> {
    let last_char = duration
        .chars()
        .last()
        .ok_or_else(|| Error::new(Status::InvalidArg, "Empty duration string"))?;
    let value: u64 = duration[..duration.len() - 1]
        .parse()
        .map_err(|e| Error::new(Status::InvalidArg, format!("Invalid duration: {}", e)))?;
    match last_char {
        's' => Ok(value),
        'm' => Ok(value * 60),
        'h' => Ok(value * 3600),
        'd' => Ok(value * 86400),
        _ => Err(Error::new(
            Status::InvalidArg,
            format!("Invalid duration unit: {}", last_char),
        )),
    }
}

fn parse_algorithm(algorithm: &str) -> napi::Result<Algorithm> {
    match algorithm {
        "HS256" => Ok(Algorithm::HS256),
        "HS384" => Ok(Algorithm::HS384),
        "HS512" => Ok(Algorithm::HS512),
        "RS256" => Ok(Algorithm::RS256),
        "RS384" => Ok(Algorithm::RS384),
        "RS512" => Ok(Algorithm::RS512),
        "ES256" => Ok(Algorithm::ES256),
        "ES384" => Ok(Algorithm::ES384),
        _ => Err(Error::new(
            Status::InvalidArg,
            format!("Unsupported algorithm: {}", algorithm),
        )),
    }
}
