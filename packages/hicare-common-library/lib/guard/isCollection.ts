/**
 * 주어진 값이 Map 객체인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 Map 객체이면 true, 아니면 false
 * @signature
 *  isMap(data)
 * @example
 *  isMap(new Map()) // => true
 *  isMap(new Map([['key', 'value']])) // => true
 *
 *  isMap({}) // => false
 *  isMap([]) // => false
 *  isMap(new Set()) // => false
 *  isMap(null) // => false
 * @category Guard
 */
export function isMap(data: unknown): data is Map<unknown, unknown> {
    return data instanceof Map;
}

/**
 * 주어진 값이 Set 객체인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 Set 객체이면 true, 아니면 false
 * @signature
 *  isSet(data)
 * @example
 *  isSet(new Set()) // => true
 *  isSet(new Set([1, 2, 3])) // => true
 *
 *  isSet({}) // => false
 *  isSet([]) // => false
 *  isSet(new Map()) // => false
 *  isSet(null) // => false
 * @category Guard
 */
export function isSet(data: unknown): data is Set<unknown> {
    return data instanceof Set;
}

/**
 * 주어진 값이 WeakMap 객체인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 WeakMap 객체이면 true, 아니면 false
 * @signature
 *  isWeakMap(data)
 * @example
 *  isWeakMap(new WeakMap()) // => true
 *
 *  isWeakMap(new Map()) // => false
 *  isWeakMap({}) // => false
 *  isWeakMap([]) // => false
 *  isWeakMap(null) // => false
 * @category Guard
 */
export function isWeakMap(data: unknown): data is WeakMap<object, unknown> {
    return data instanceof WeakMap;
}

/**
 * 주어진 값이 WeakSet 객체인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 WeakSet 객체이면 true, 아니면 false
 * @signature
 *  isWeakSet(data)
 * @example
 *  isWeakSet(new WeakSet()) // => true
 *
 *  isWeakSet(new Set()) // => false
 *  isWeakSet({}) // => false
 *  isWeakSet([]) // => false
 *  isWeakSet(null) // => false
 * @category Guard
 */
export function isWeakSet(data: unknown): data is WeakSet<object> {
    return data instanceof WeakSet;
}
