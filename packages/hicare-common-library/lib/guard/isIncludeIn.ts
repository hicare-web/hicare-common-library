/**
 * 주어진 데이터가 순환 가능한(iterable) 데이터 구조 내에 포함되어 있는지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @param iterable - 데이터를 찾을 순환 가능한 데이터 구조
 * @returns 데이터가 iterable 내에 포함되어 있으면 true, 아니면 false
 * @signature
 *  isIncludedIn<T>(data: T, iterable: Iterable<T>): boolean
 * @example
 *  isIncludedIn(2, [1, 2, 3]) // => true
 *  isIncludedIn('b', new Set(['a', 'b', 'c'])) // => true
 *  isIncludedIn('x', 'xyz') // => true
 *  isIncludedIn(4, new Map([[1, 'a'], [2, 'b'], [3, 'c']])) // => false
 *  isIncludedIn('d', ['a', 'b', 'c']) // => false
 * @category Logic
 */
export function isIncludeIn<T>(data: T, iterable: Map<T, any> | Iterable<T> | string): boolean {
    if (typeof iterable === 'string' && typeof data === 'string') {
        return iterable.includes(data);
    }

    for (const item of iterable) {
        if (item === data) {
            return true;
        }
    }

    return false;
}
