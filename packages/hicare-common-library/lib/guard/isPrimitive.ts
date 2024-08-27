/**
 * 주어진 값이 원시 타입(primitive type)인지 확인하는 함수
 *
 * 원시 타입은 string, number, boolean, undefined, symbol, null을 포함합니다.
 *
 * @param data - 확인할 값
 * @returns 값이 원시 타입이면 true, 아니면 false
 * @signature
 *  isPrimitive(data)
 * @example
 *  isPrimitive('string') // => true
 *  isPrimitive(42) // => true
 *  isPrimitive(true) // => true
 *  isPrimitive(undefined) // => true
 *  isPrimitive(null) // => true
 *  isPrimitive(Symbol('test')) // => true
 *
 *  isPrimitive({}) // => false
 *  isPrimitive([]) // => false
 *  isPrimitive(new Date()) // => false
 *  isPrimitive(() => {}) // => false
 * @category Guard
 */
export function isPrimitive(data: unknown): data is string | number | boolean | undefined | symbol | null {
    return data === null || (typeof data !== 'object' && typeof data !== 'function');
}
