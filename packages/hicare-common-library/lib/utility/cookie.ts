/**
 * 지정된 이름의 쿠키 값을 가져옵니다.
 *
 * @param {string} name - 검색할 쿠키의 이름
 * @returns {string|null} 쿠키 값 또는 쿠키를 찾지 못한 경우 null
 *
 * @example
 * // 'username' 쿠키 값 가져오기
 * const username = getCookie('username');
 * if (username) {
 *   console.log('현재 사용자:', username);
 * } else {
 *   console.log('로그인된 사용자가 없습니다.');
 * }
 */
export function getCookie(name:string) {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }

    return null;
}

/**
 * 지정된 이름과 값으로 쿠키를 설정합니다.
 *
 * @param {string} name - 설정할 쿠키의 이름
 * @param {string} value - 설정할 쿠키의 값
 * @param {Object} [options] - 쿠키 설정을 위한 옵션 객체
 * @param {number} [options.maxAge] - 쿠키의 최대 수명 (초 단위)
 * @param {string} [options.path] - 쿠키의 경로
 * @param {string} [options.domain] - 쿠키의 도메인
 * @param {boolean} [options.secure] - 보안 쿠키 여부
 * @param {'strict' | 'lax' | 'none'} [options.sameSite] - Same-Site 쿠키 설정
 * @param {Date} [options.expires] - 쿠키의 만료 날짜 (권장하지 않음: maxAge 사용 권장)
 *
 * @example
 * // 기본 쿠키 설정
 * setCookie('username', 'john_doe');
 *
 * // 옵션을 사용한 쿠키 설정
 * setCookie('session', 'abc123', {
 *   maxAge: 3600,
 *   path: '/',
 *   secure: true,
 *   sameSite: 'strict'
 * });
 */
export function setCookie(name: string, value: string, options: {
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
} = {}) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.maxAge) {
        cookie += `; max-age=${options.maxAge}`;
    }

    if (options.path) {
        cookie += `; path=${options.path}`;
    }

    if (options.domain) {
        cookie += `; domain=${options.domain}`;
    }

    if (options.secure) {
        cookie += '; secure';
    }

    if (options.sameSite) {
        cookie += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookie;
}

/**
 * 지정된 이름의 쿠키를 삭제합니다.
 *
 * @param {string} name - 삭제할 쿠키의 이름
 * @param {string} path - 쿠키의 경로
 * @param {string} domain - 쿠키의 도메인
 *
 * @example
 * // 'username' 쿠키 삭제
 * deleteCookie('username', '/', 'example.com');
 */
export function deleteCookie(name: string, path: string, domain: string) {
    // 만료일을 과거로 설정하여 쿠키를 삭제합니다
    setCookie(name, '', {
        maxAge: -1,
        path: path,
        domain: domain
    });
}