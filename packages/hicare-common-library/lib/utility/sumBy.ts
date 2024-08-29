import { IterateeFunction } from 'lib/types';

/**
 * 주어진 배열의 요소들에 대해 iteratee 함수를 적용한 결과의 합을 계산합니다.
 *
 * @param array - 대상 배열
 * @param iteratee - 각 요소에 적용할 함수
 * @returns iteratee 함수를 적용한 결과의 합
 * @signature
 *  sumBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): number
 * @example
 *  sumBy([{ n: 1 }, { n: 2 }], o => o.n) // => 3
 *  sumBy([{ n: -1 }, { n: -2 }], o => Math.abs(o.n)) // => 3
 * @category Array - Math
 */
export function sumBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): number {
    const len = array.length;
    let sum = 0;

    for (let i = 0; i < len; i++) {
        sum += iteratee(array[i]);
    }

    return sum;
}