use napi::{Env, JsString, Result};
use uuid::Uuid;
use std::sync::Arc;
use parking_lot::Mutex;
use once_cell::sync::Lazy;
use std::collections::VecDeque;
const POOL_SIZE: usize = 20;

struct UuidPool {
    pool: VecDeque<String>,
}

impl UuidPool {
    fn new() -> Self {
        let mut pool = VecDeque::with_capacity(POOL_SIZE);
        for _ in 0..POOL_SIZE {
            pool.push_back(Uuid::new_v4().to_string());
        }
        UuidPool { pool }
    }

    fn get_uuid(&mut self) -> String {
        if let Some(uuid) = self.pool.pop_front() {
            // UUID를 하나 꺼내고 새로운 UUID를 생성하여 뒤에 추가
            self.pool.push_back(Uuid::new_v4().to_string());
            uuid
        } else {
            // 만약 풀이 비어있다면 (이런 경우는 없어야 하지만) 새로운 UUID 생성
            Uuid::new_v4().to_string()
        }
    }
}

static UUID_POOL: Lazy<Arc<Mutex<UuidPool>>> = Lazy::new(|| {
    Arc::new(Mutex::new(UuidPool::new()))
});

#[napi(js_name = "getUuid")]
pub fn get_uuid() -> String {
    UUID_POOL.lock().get_uuid()
}
#[napi(js_name = "uuidV4")]
pub fn uuid_v4(env: Env) -> Result<JsString> {
    let uuid = Uuid::new_v4();

    env.create_string(uuid.to_string().as_str())
}

#[napi(js_name = "uuidV4Pure")]
pub fn uuid_v4_pure() -> Result<String> {
    Ok(Uuid::new_v4().to_string())
}
#[napi(js_name = "uuidV4Pure1")]
pub fn uuid_v4_pure1() -> String {
    let uuid = Uuid::new_v4();
    uuid.as_simple().to_string()
}

// #[napi(js_name = "uuidV4BufferTokio")]
// pub async fn uuid_v4_buffer_tokio() -> Result<Buffer> {
//     task::spawn_blocking(|| {
//         let uuid = Uuid::new_v4();
//         uuid.as_bytes().to_vec();
//     }).await
//         .map_err(|e| napi::Error::from_reason(e.to_string()))?
// }