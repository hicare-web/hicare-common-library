/**
 * 주어진 데이터가 배열인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 배열이면 true, 배열이 아니면 false 반환
 * @signature
 *  isArray<T>(data: unknown): data is T[]
 * @example
 *  isArray([1, 2, 3]) // => true
 *  isArray([]) // => true
 *  isArray(['a', 'b', 'c']) // => true
 *
 *  isArray('string') // => false
 *  isArray({ key: 'value' }) // => false
 *  isArray(null) // => false
 *  isArray(undefined) // => false
 *  isArray(42) // => false
 *  isArray(new Set([1, 2, 3])) // => false
 * @category Guard
 */
export function isArray<T>(data: unknown): data is T[] {
    return Array.isArray(data);
}

/**
 * 주어진 데이터가 유사 배열(array-like)인지 확인하는 함수
 *
 * 유사 배열은 length 속성을 가지고 있고, 그 값이 0 이상의 정수인 객체입니다.
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 유사 배열이면 true, 아니면 false 반환
 * @signature
 *  isArrayLike(data): data is ArrayLike<unknown>
 * @example
 *  isArrayLike([1, 2, 3]) // => true
 *  isArrayLike({ length: 3 }) // => true
 *  isArrayLike('string') // => true
 *
 *  isArrayLike({}) // => false
 *  isArrayLike(null) // => false
 *  isArrayLike(undefined) // => false
 *  isArrayLike({ length: -1 }) // => false
 * @category Guard
 */
export function isArrayLike(data: unknown): data is ArrayLike<unknown> {
    if (data == null) {
        return false;
    }

    if (typeof data === 'string') {
        return true;
    }

    if (typeof data === 'object' && 'length' in data) {
        const length = data.length as number;
        return Number.isInteger(length) && length >= 0;
    }

    return !!isArray(data);
}

/**
 * 주어진 데이터가 iterable인지 확인하는 함수
 *
 * Iterable은 Symbol.iterator 메서드를 가지고 있는 객체입니다.
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 iterable이면 true, 아니면 false 반환
 * @signature
 *  isIterable(data): data is Iterable<unknown>
 * @example
 *  isIterable([1, 2, 3]) // => true
 *  isIterable(new Set()) // => true
 *  isIterable(new Map()) // => true
 *  isIterable('string') // => true
 *
 *  isIterable({}) // => false
 *  isIterable(null) // => false
 *  isIterable(undefined) // => false
 *  isIterable({ length: 3 }) // => false
 * @category Guard
 */
export function isIterable(data: unknown): data is Iterable<unknown> {
    return data != null && typeof (data as any)[Symbol.iterator] === 'function';
}
