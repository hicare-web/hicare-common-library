/**
 * 주어진 값이 falsy인지 확인하는 함수
 *
 * JavaScript에서 falsy 값은 다음과 같습니다:
 * false, 0, -0, 0n, "", null, undefined, NaN
 *
 * @param data - 확인할 값
 * @returns 값이 falsy이면 true, 아니면 false
 * @signature
 *  isFalsy(data)
 * @example
 *  isFalsy(false) // => true
 *  isFalsy(0) // => true
 *  isFalsy('') // => true
 *  isFalsy(null) // => true
 *  isFalsy(undefined) // => true
 *  isFalsy(NaN) // => true
 *
 *  isFalsy(true) // => false
 *  isFalsy(1) // => false
 *  isFalsy('0') // => false
 *  isFalsy([]) // => false
 *  isFalsy({}) // => false
 * @category Logic
 */
export function isFalsy(data: unknown): boolean {
    return !data;
}

/**
 * 주어진 값이 truthy인지 확인하는 함수
 *
 * JavaScript에서 truthy 값은 falsy가 아닌 모든 값입니다.
 *
 * @param data - 확인할 값
 * @returns 값이 truthy이면 true, 아니면 false
 * @signature
 *  isTruthy(data)
 * @example
 *  isTruthy(true) // => true
 *  isTruthy(1) // => true
 *  isTruthy('0') // => true
 *  isTruthy([]) // => true
 *  isTruthy({}) // => true
 *
 *  isTruthy(false) // => false
 *  isTruthy(0) // => false
 *  isTruthy('') // => false
 *  isTruthy(null) // => false
 *  isTruthy(undefined) // => false
 *  isTruthy(NaN) // => false
 * @category Logic
 */
export function isTruthy(data: unknown): boolean {
    return Boolean(data);
}
