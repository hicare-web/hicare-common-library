/** UUID v4 생성을 위한 템플릿 문자열 */
const UUID_TEMPLATE = '10000000-1000-4000-8000-100000000000';

/** 변환이 필요한 특수 문자들 */
const TRANSFORM_CHARS = ['0', '1', '8'];

/**
 * UUID v4를 생성합니다.
 * 이 함수는 암호학적으로 안전한 난수 생성기를 사용하여
 * RFC 4122 규격을 준수하는 UUID를 생성합니다.
 *
 * @returns 생성된 UUID v4 문자열
 *
 * @example
 * console.log(uuidv4()); // 예: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
 *
 * @category Utility
 */
export function uuidv4(): string {
    return Array.from(UUID_TEMPLATE)
        .map((char) => {
            if (!TRANSFORM_CHARS.includes(char)) return char;

            const random =
                char === '0'
                    ? (getCryptoRandom() * 16) | 0 // 0인 경우 0-15 범위의 난수
                    : (getCryptoRandom() * 4) | 8; // 1 또는 8인 경우 8-11 범위의 난수

            return random.toString(16);
        })
        .join('');
}
/**
 * 암호학적으로 안전한 난수를 생성합니다.
 *
 * @returns 0에서 1 사이의 암호학적으로 안전한 난수
 */
function getCryptoRandom(): number {
    return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
}
