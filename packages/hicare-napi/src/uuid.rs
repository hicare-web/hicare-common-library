use std::collections::VecDeque;
use std::sync::{Mutex};
use crossbeam_queue::ArrayQueue;
use lazy_static::lazy_static;
use napi::{Env, JsString, Result};
use once_cell::sync::Lazy;
use uuid::{Uuid};

const DEFAULT_UUID_SIZE: usize = 1024;



static CACHED_UUID_STRING: Lazy<String> = Lazy::new(|| {
    Uuid::new_v4().to_string()
});

lazy_static! {
    static ref CACHED_UUID: Mutex<Uuid> = Mutex::new(Uuid::new_v4());
}

struct UuidQueue {
    queue: ArrayQueue<String>,
}
impl UuidQueue {
    fn new() -> Self {
        let queue = ArrayQueue::new(DEFAULT_UUID_SIZE);
        for _ in 0..DEFAULT_UUID_SIZE {
            queue.push(Uuid::new_v4().to_string()).unwrap();
        }
        UuidQueue { queue }
    }

    fn is_full(&self) -> bool {
        self.queue.is_full()
    }

    fn add_uuid(&mut self) {
        if self.queue.is_full() {
            return;
        } else {
            while !self.queue.is_full() {
                self.queue.push(Uuid::new_v4().to_string()).map_err(|e| {
                    eprintln!("Failed to push uuid to queue: {:?}", e);
                }).unwrap();
            }
        }
    }

    fn get_uuid(&mut self) -> String {
        if let Some(uuid) = self.queue.pop() {
            return uuid;
        } else {
            return Uuid::new_v4().to_string();
        }
    }
}

struct UuidQueue2 {
    queue: VecDeque<String>,
}
impl UuidQueue2 {
    fn new() -> Self {
        let mut queue = VecDeque::with_capacity(DEFAULT_UUID_SIZE);
        for _ in 0..DEFAULT_UUID_SIZE {
            queue.push_back(Uuid::new_v4().to_string());
        }
        UuidQueue2 { queue }
    }

    fn is_full(&self) -> bool {
        self.queue.len() == DEFAULT_UUID_SIZE
    }

    fn add_uuid(&mut self) {
        if self.is_full() {
            return;
        } else {
            while !self.is_full() {
                self.queue.push_back(Uuid::new_v4().to_string());
            }
        }
    }

    fn get_uuid(&mut self) -> String {
        if let Some(uuid) = self.queue.pop_front() {
            return uuid;
        } else {
            return Uuid::new_v4().to_string();
        }
    }
}

lazy_static! {
    static ref UUID_QUEUE: Mutex<UuidQueue> = Mutex::new(UuidQueue::new());
    static ref UUID_QUEUE2: Mutex<UuidQueue2> = Mutex::new(UuidQueue2::new());
}

pub fn init_queue() {
    std::thread::spawn(|| {
        loop {
            std::thread::sleep(std::time::Duration::from_millis(10));

            if let Ok(mut uuid) = UUID_QUEUE.lock() {
                if uuid.is_full() {
                    continue;
                } else {
                    uuid.add_uuid();
                }
            }
        }
    });

    std::thread::spawn(|| {
        loop {
            std::thread::sleep(std::time::Duration::from_millis(10));

            if let Ok(mut uuid) = UUID_QUEUE2.lock() {
                if uuid.is_full() {
                    continue;
                } else {
                    uuid.add_uuid();
                }
            }
        }
    });
    return;
}

#[napi(js_name = "uuidV4")]
#[inline(always)]
pub fn uuid_v4(env: Env) -> Result<JsString> {
    let uuid = Uuid::new_v4();

    env.create_string(uuid.to_string().as_str())
}

#[napi(js_name = "uuidV4Pure")]
#[inline(always)]
pub fn uuid_v4_pure() -> Result<String> {
    Ok(Uuid::new_v4().to_string())
}


#[napi(js_name = "uuidV4Cached")]
#[inline(always)]
pub fn uuid_v4_pure_cached() -> Result<String> {
    Ok(CACHED_UUID_STRING.clone())
}

#[napi(js_name = "uuidV4Queue")]
#[inline(always)]
pub fn uuid_v4_queue() -> String {
    if let Ok(mut uuid) = UUID_QUEUE.lock() {
        uuid.get_uuid()
    } else {
        Uuid::new_v4().to_string()
    }
}

#[napi(js_name = "uuidV4Queue2")]
#[inline(always)]
pub fn uuid_v4_queue2() -> String {
    if let Ok(mut uuid) = UUID_QUEUE2.lock() {
        uuid.get_uuid()
    } else {
        Uuid::new_v4().to_string()
    }

}