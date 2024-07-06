import type { GroupByKey } from 'lib/types';
import { isArray } from 'lib/guard';

/**
 * 주어진 키 함수를 기반으로 배열의 요소들을 그룹화합니다.
 *
 * @template T 입력 배열의 요소 타입
 * @template {string | number | symbol} K 키 함수가 반환하는 키의 타입
 *
 * @param {T[]} array 그룹화할 입력 배열
 * @param {function(T): K} keyFn 배열의 요소를 받아 그룹화 키를 반환하는 함수
 *
 * @throws {TypeError} 첫 번째 인자가 배열이 아니거나 두 번째 인자가 함수가 아닌 경우 발생
 * @throws {TypeError} 키 함수가 문자열, 숫자, 심볼이 아닌 값을 반환할 경우 발생
 *
 * @returns {Object.<K, T[]>} 키 함수의 결과를 키로 하고, 해당 키를 생성한 요소들의 배열을 값으로 하는 객체
 *
 * @example
 * const 사람들 = [
 *   { 이름: "Alice", 나이: 25 },
 *   { 이름: "Bob", 나이: 30 },
 *   { 이름: "Charlie", 나이: 25 },
 *   { 이름: "David", 나이: 30 }
 * ];
 * const 나이별그룹 = optimizedGroupBy(사람들, 사람 => 사람.나이);
 * // 결과:
 * // {
 * //   "25": [{ 이름: "Alice", 나이: 25 }, { 이름: "Charlie", 나이: 25 }],
 * //   "30": [{ 이름: "Bob", 나이: 30 }, { 이름: "David", 나이: 30 }]
 * // }
 */
export function groupBy<T, K extends GroupByKey>(array: T[], keyFn: (item: T) => K): Record<K, T[]> {
    if (!isArray(array)) {
        throw new TypeError('First argument must be an array');
    }

    if (typeof keyFn !== 'function') {
        throw new TypeError('Second argument must be a function');
    }

    const result = Object.create(null) as Record<K, T[]>;
    const length = array.length;

    for (let i = 0; i < length; i++) {
        const item = array[i];
        const key = keyFn(item);

        if (typeof key !== 'string' && typeof key !== 'number' && typeof key !== 'symbol') {
            throw new TypeError('Key function must return a string, number, or symbol');
        }

        (result[key] || (result[key] = [])).push(item);
    }

    return result;
}
