/**
 * UUID v4를 생성합니다.
 * 이 함수는 암호학적으로 안전한 난수 생성기를 사용합니다.
 *
 * @returns 생성된 UUID v4 문자열
 *
 * @example
 * console.log(uuidv4()); // 예: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
 *
 * @category Utility
 */
export function uuidv4(): string {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
        (+c ^ (getCryptoRandom() & (15 >> (+c / 4)))).toString(16),
    );
}

/**
 * 암호학적으로 안전한 난수를 생성합니다.
 * 브라우저와 Node.js 환경을 모두 지원합니다.
 *
 * @returns 0에서 1 사이의 암호학적으로 안전한 난수
 */
function getCryptoRandom(): number {
    // 브라우저 환경
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
    }
    // Node.js 환경
    else if (typeof require !== 'undefined') {
        const crypto = require('crypto');
        return crypto.randomBytes(4).readUInt32LE() / 4294967296;
    }
    // 적절한 암호학적 난수 생성기를 찾지 못한 경우
    else {
        throw new Error('No secure random number generator available');
    }
}
