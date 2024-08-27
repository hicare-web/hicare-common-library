/**
 * 주어진 값이 객체인지 확인하는 함수
 *
 * 이 함수는 일반적인 객체({})뿐만 아니라 배열, 함수, 그리고 Date, RegExp 등의
 * 내장 객체 타입도 객체로 간주합니다. 그러나 null은 객체로 간주하지 않습니다.
 *
 * @param value - 확인할 값
 * @returns 값이 객체이면 true, 아니면 false
 * @signature
 *  isObject(value)
 * @example
 *  isObject({}) // => true
 *  isObject([]) // => true
 *  isObject(() => {}) // => true
 *  isObject(new Date()) // => true
 *  isObject(new RegExp('')) // => true
 *
 *  isObject(null) // => false
 *  isObject(undefined) // => false
 *  isObject(42) // => false
 *  isObject('string') // => false
 *  isObject(true) // => false
 * @category Guard
 */

export function isObject(value: unknown): value is object {
    return (typeof value === 'object' && value !== null) || typeof value === 'function';
}

/**
 * 주어진 값이 순수한 객체({})인지 확인하는 함수
 *
 * 이 함수는 오직 일반적인 객체({})만을 객체로 간주합니다.
 * 배열, 함수, 그리고 Date, RegExp 등의 내장 객체 타입은 객체로 간주하지 않습니다.
 *
 * @param value - 확인할 값
 * @returns 값이 순수한 객체이면 true, 아니면 false
 * @signature
 *  isPlainObject(value)
 * @example
 *  isPlainObject({}) // => true
 *  isPlainObject({ a: 1 }) // => true
 *
 *  isPlainObject([]) // => false
 *  isPlainObject(() => {}) // => false
 *  isPlainObject(new Date()) // => false
 *  isPlainObject(new RegExp('')) // => false
 *  isPlainObject(null) // => false
 *  isPlainObject(undefined) // => false
 *  isPlainObject(42) // => false
 *  isPlainObject('string') // => false
 *  isPlainObject(true) // => false
 * @category Guard
 */

export function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}
