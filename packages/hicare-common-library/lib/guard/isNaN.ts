/**
 * 순수하게 구현된 isNaN 함수
 *
 * @param value - 검사할 값
 * @returns 값이 NaN이면 true, 아니면 false
 * @signature
 *  isNaN(value)
 * @example
 *  isNaN(NaN) // => true
 *  isNaN(1) // => false
 *  isNaN('1') // => false
 *  isNaN({}) // => false
 * @category Guard
 */
export function isNaN(value: unknown): boolean {
    // NaN은 자기 자신과 같지 않은 유일한 값입니다
    return value !== value;
}
