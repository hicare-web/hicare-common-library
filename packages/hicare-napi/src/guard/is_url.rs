pub fn is_url(s: &str) -> bool {
    // URL의 최소 길이를 확인 (예: "http://a.b")
    if s.len() < 10 {
        return false;
    }

    // 스키마 확인 (http:// 또는 https://)
    if !s.starts_with("http://") && !s.starts_with("https://") {
        return false;
    }

    // 도메인 확인 (최소한 하나의 점을 포함해야 함)
    let domain_start = s.find("://").map(|i| i + 3).unwrap_or(0);
    let domain_end = s[domain_start..].find('/').map(|i| i + domain_start).unwrap_or(s.len());
    let domain = &s[domain_start..domain_end];

    domain.contains('.') && !domain.starts_with('.') && !domain.ends_with('.')
}