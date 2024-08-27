/**
 * 순수하게 구현된 isFinite 함수
 *
 * @param value - 검사할 값
 * @returns 값이 유한수이면 true, 아니면 false
 * @signature
 *  isFinite(value)
 * @example
 *  isFinite(1) // => true
 *  isFinite(Infinity) // => false
 *  isFinite(-Infinity) // => false
 *  isFinite(NaN) // => false
 *  isFinite('1') // => false
 * @category Guard
 */
export function isFinite(value: unknown): value is number {
    // 먼저 숫자가 아닌 값을 걸러냅니다
    if (typeof value !== 'number') {
        return false;
    }

    // Infinity, -Infinity, NaN을 검사합니다
    return value > -Infinity && value < Infinity;
}
