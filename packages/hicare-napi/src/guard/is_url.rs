pub fn is_url(s: &[u8]) -> bool {
    // URL의 최소 길이를 확인 (예: "http://a.b")
    if s.len() < 10 {
        return false;
    }

    // 스키마 확인 (http:// 또는 https://)
    if !starts_with(s, b"http://") && !starts_with(s, b"https://") {
        return false;
    }

    // 도메인 확인 (최소한 하나의 점을 포함해야 함)
    let domain_start = find_subsequence(s, b"://").map(|i| i + 3).unwrap_or(0);
    let domain_end = find_byte(&s[domain_start..], b'/').map(|i| i + domain_start).unwrap_or(s.len());
    let domain = &s[domain_start..domain_end];

    contains_byte(domain, b'.') && domain[0] != b'.' && domain[domain.len() - 1] != b'.'
}

fn starts_with(haystack: &[u8], needle: &[u8]) -> bool {
    haystack.len() >= needle.len() && &haystack[..needle.len()] == needle
}

fn find_subsequence(haystack: &[u8], needle: &[u8]) -> Option<usize> {
    haystack.windows(needle.len()).position(|window| window == needle)
}

fn find_byte(haystack: &[u8], needle: u8) -> Option<usize> {
    haystack.iter().position(|&b| b == needle)
}

fn contains_byte(haystack: &[u8], needle: u8) -> bool {
    haystack.iter().any(|&b| b == needle)
}