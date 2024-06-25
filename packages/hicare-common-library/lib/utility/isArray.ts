/**
 * 주어진 데이터가 배열인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 배열이면 true, 배열이 아니면 false 반환
 * @signature
 *  isArray<T>(data: T | T[]): data is T[]
 * @example
 *  isArray([1, 2, 3]) // => true
 *  isArray([]) // => true
 *
 *  isArray('string') // => false
 *  isArray({ key: 'value' }) // => false
 *  isArray(null) // => false
 *  isArray(undefined) // => false
 *  ...
 * @category Guard
 */

export function isArray<T>(data: T): data is T extends any[] ? T : T & unknown[] {
    return Array.isArray(data);
}
