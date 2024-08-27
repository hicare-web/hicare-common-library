/**
 * 받은 데이터가 빈값인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 비어있으면 true, 아니면 false
 * @signature
 *  isEmpty(data)
 * @example
 *  isEmpty(undefined) // => true
 *  isEmpty(null) // => true
 *  isEmpty('') // => true
 *  isEmpty('  ') // => true
 *  isEmpty([]) // => true
 *  isEmpty({}) // => true
 *  isEmpty(new Set()) // => true
 *  isEmpty(new Map()) // => true
 *  isEmpty(new WeakSet()) // => false
 *  isEmpty(new WeakMap()) // => false
 *  isEmpty(new Date('')) // => true
 *  isEmpty(new Error('')) // => true
 *  isEmpty(/(?:)/) // => true
 *  isEmpty(Buffer.alloc(0)) // => true (Node.js environment)
 *  isEmpty(new Blob([])) // => true (Browser environment)
 *  isEmpty(0) // => false
 *  isEmpty(false) // => false
 *  isEmpty('hello') // => false
 *  isEmpty([1, 2, 3]) // => false
 *  isEmpty({ a: 1 }) // => false
 *  isEmpty(new Date()) // => false
 *  isEmpty(new Error('Some error')) // => false
 *  isEmpty(/abc/) // => false
 *  isEmpty(Buffer.from([1, 2, 3])) // => false (Node.js environment)
 *  isEmpty(new Blob(['Hello'])) // => false (Browser environment)
 * @category Guard
 */

type EmptyPrimitive = undefined | null | '';
type EmptyObject = Record<string, never>;
type EmptyArray = [];
type EmptySet = Set<never>;
type EmptyMap = Map<never, never>;
type EmptyDate = Date & { getTime(): number };
type EmptyRegExp = RegExp & { source: '(?:)' };
type EmptyError = Error & { message: '' };
type EmptyBuffer = Buffer & { length: 0 };
type EmptyBlob = Blob & { size: 0 };

export type IsEmpty =
    | EmptyPrimitive
    | EmptyObject
    | EmptyArray
    | EmptySet
    | EmptyMap
    | EmptyDate
    | EmptyRegExp
    | EmptyError
    | EmptyBuffer
    | EmptyBlob;

export function isEmpty(data: unknown): data is IsEmpty {
    if (data == null) {
        return true;
    }

    if (typeof data === 'string') {
        return data.trim() === '';
    }

    if (Array.isArray(data)) {
        return data.length === 0;
    }

    if (data instanceof Set || data instanceof Map) {
        return data.size === 0;
    }

    if (data instanceof WeakSet || data instanceof WeakMap) {
        // WeakSet과 WeakMap은 크기를 직접 확인할 수 없습니다.
        // 항상 false를 반환합니다.
        return false;
    }

    if (data instanceof Date) {
        return isNaN(data.getTime());
    }

    if (data instanceof RegExp) {
        return data.source === '(?:)';
    }

    if (data instanceof Error) {
        return data.message === '';
    }

    // Node.js Buffer 체크
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
        return data.length === 0;
    }

    // Browser Blob 체크
    if (typeof Blob !== 'undefined' && data instanceof Blob) {
        return data.size === 0;
    }

    if (typeof data === 'object') {
        return Object.keys(data).length === 0;
    }

    return false;
}
