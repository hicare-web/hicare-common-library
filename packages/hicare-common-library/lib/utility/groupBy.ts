import type { GroupByKey } from 'lib/types';
import { isArray } from 'lib/guard';

/**
 * 주어진 키 함수 또는 속성 이름을 기반으로 배열의 요소들을 그룹화합니다.
 *
 * @template T 입력 배열의 요소 타입
 * @template K 키 함수가 반환하는 키의 타입 또는 객체의 속성 키 타입
 *
 * @param {T[]} array 그룹화할 입력 배열
 * @param {((item: T) => K) | keyof T} keyFn 배열의 요소를 받아 그룹화 키를 반환하는 함수 또는 객체의 속성 이름
 *
 * @throws {TypeError} 첫 번째 인자가 배열이 아닌 경우 발생
 * @throws {TypeError} 두 번째 인자가 함수도 아니고 문자열도 아닌 경우 발생
 * @throws {TypeError} 키 함수가 문자열, 숫자, 심볼이 아닌 값을 반환할 경우 발생
 *
 * @returns {Record<K & GroupByKey, T[]>} 키 함수의 결과 또는 속성 값을 키로 하고, 해당 키를 생성한 요소들의 배열을 값으로 하는 객체
 *
 * @example
 * const 사람들 = [
 *   { 이름: "Alice", 나이: 25 },
 *   { 이름: "Bob", 나이: 30 },
 *   { 이름: "Charlie", 나이: 25 },
 *   { 이름: "David", 나이: 30 }
 * ];
 * const 나이별그룹 = groupBy(사람들, '나이');
 * // 또는
 * const 나이별그룹 = groupBy(사람들, 사람 => 사람.나이);
 * // 결과:
 * // {
 * //   "25": [{ 이름: "Alice", 나이: 25 }, { 이름: "Charlie", 나이: 25 }],
 * //   "30": [{ 이름: "Bob", 나이: 30 }, { 이름: "David", 나이: 30 }]
 * // }
 */
export function groupBy<T, K extends keyof T | GroupByKey>(
    array: T[],
    keyFn: ((item: T) => K) | keyof T,
): Record<K & GroupByKey, T[]> {
    if (!isArray(array)) {
        throw new TypeError('First argument must be an array');
    }

    if (typeof keyFn !== 'function' && typeof keyFn !== 'string') {
        throw new TypeError('Second argument must be a function or a string');
    }

    const result = Object.create(null) as Record<K & GroupByKey, T[]>;
    const length = array.length;

    const getKey = typeof keyFn === 'function' ? keyFn : (item: T) => item[keyFn] as K;

    for (let i = 0; i < length; i++) {
        const item = array[i];
        const key = getKey(item);

        if (typeof key !== 'string' && typeof key !== 'number' && typeof key !== 'symbol') {
            throw new TypeError('Key function must return a string, number, or symbol');
        }

        (result[key as K & GroupByKey] || (result[key as K & GroupByKey] = [])).push(item);
    }

    return result;
}
