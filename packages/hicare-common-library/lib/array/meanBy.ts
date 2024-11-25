import type { IterateeFunction } from 'lib/types';

/**
 * 주어진 배열의 요소들에 대해 iteratee 함수를 적용한 결과의 평균을 계산합니다.
 *
 * @param array - 대상 배열
 * @param iteratee - 각 요소에 적용할 함수
 * @returns iteratee 함수를 적용한 결과의 평균
 * @signature
 *  meanBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): number
 * @example
 *  meanBy([{ n: 1 }, { n: 2 }], o => o.n) // => 1.5
 *  meanBy([{ n: -1 }, { n: -2 }], o => Math.abs(o.n)) // => 1.5
 * @category Array - Math
 */
export function meanBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): number {
    const len = array.length;
    if (len === 0) return NaN;

    let sum = 0;

    for (let i = 0; i < len; i++) {
        sum += iteratee(array[i]);
    }

    return sum / len;
}
