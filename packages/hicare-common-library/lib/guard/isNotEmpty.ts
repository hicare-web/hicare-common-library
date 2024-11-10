/**
 * 받은 데이터가 비어있지 않은지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 비어있지 않으면 true, 비어있으면 false
 * @signature
 *  isNotEmpty(data)
 * @example
 *  isNotEmpty(undefined) // => false
 *  isNotEmpty(null) // => false
 *  isNotEmpty('') // => false
 *  isNotEmpty('  ') // => false
 *  isNotEmpty([]) // => false
 *  isNotEmpty({}) // => false
 *  isNotEmpty(new Set()) // => false
 *  isNotEmpty(new Map()) // => false
 *  isNotEmpty(new WeakSet()) // => true
 *  isNotEmpty(new WeakMap()) // => true
 *  isNotEmpty(new Date('')) // => false
 *  isNotEmpty(new Error('')) // => false
 *  isNotEmpty(/(?:)/) // => false
 *  isNotEmpty(Buffer.alloc(0)) // => false (Node.js environment)
 *  isNotEmpty(new Blob([])) // => false (Browser environment)
 *  isNotEmpty(0) // => true
 *  isNotEmpty(false) // => true
 *  isNotEmpty('hello') // => true
 *  isNotEmpty([1, 2, 3]) // => true
 *  isNotEmpty({ a: 1 }) // => true
 *  isNotEmpty(new Date()) // => true
 *  isNotEmpty(new Error('Some error')) // => true
 *  isNotEmpty(/abc/) // => true
 *  isNotEmpty(Buffer.from([1, 2, 3])) // => true (Node.js environment)
 *  isNotEmpty(new Blob(['Hello'])) // => true (Browser environment)
 * @category Guard
 */

// isEmpty의 반대 타입을 정의합니다
type NotEmptyPrimitive = number | boolean | symbol;
type NotEmptyString = string & { length: number } & { trim(): string };
type NotEmptyObject = object & { [key: string]: unknown };
type NotEmptyArray<T> = T[] & { length: number } & { 0: T };
type NotEmptySet<T> = Set<T> & { size: number };
type NotEmptyMap<K, V> = Map<K, V> & { size: number };
type NotEmptyWeakSet = WeakSet<object>;
type NotEmptyWeakMap = WeakMap<object, unknown>;
type NotEmptyDate = Date & { getTime(): number };
type NotEmptyRegExp = RegExp & { source: string };
type NotEmptyError = Error & { message: string };
type NotEmptyBuffer = Buffer & { length: number };
type NotEmptyBlob = Blob & { size: number };

export type IsNotEmpty =
    | NotEmptyPrimitive
    | NotEmptyString
    | NotEmptyObject
    | NotEmptyArray<unknown>
    | NotEmptySet<unknown>
    | NotEmptyMap<unknown, unknown>
    | NotEmptyWeakSet
    | NotEmptyWeakMap
    | NotEmptyDate
    | NotEmptyRegExp
    | NotEmptyError
    | NotEmptyBuffer
    | NotEmptyBlob;

export function isNotEmpty<T>(data: T): data is T & IsNotEmpty {
    if (data == null) {
        return false;
    }

    if (typeof data === 'string') {
        return data !== '';
    }

    if (data === 'Invalid date') {
        return false;
    }

    if (Array.isArray(data)) {
        return data.length > 0;
    }

    if (data instanceof Set || data instanceof Map) {
        return data.size > 0;
    }

    if (data instanceof WeakSet || data instanceof WeakMap) {
        // WeakSet과 WeakMap은 크기를 직접 확인할 수 없습니다.
        // 항상 true를 반환합니다.
        return true;
    }

    if (data instanceof Date) {
        return !isNaN(data.getTime());
    }

    if (data instanceof RegExp) {
        return data.source !== '(?:)';
    }

    if (data instanceof Error) {
        return data.message !== '';
    }

    // Node.js Buffer 체크
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
        return data.length > 0;
    }

    // Browser Blob 체크
    if (typeof Blob !== 'undefined' && data instanceof Blob) {
        return data.size > 0;
    }

    if (typeof data === 'object') {
        return Object.keys(data).length > 0;
    }

    // number, boolean, symbol 등의 primitive 타입은 항상 비어있지 않은 것으로 간주
    return true;
}
