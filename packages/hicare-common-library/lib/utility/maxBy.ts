import type { IterateeFunction } from 'lib/types';

/**
 * 주어진 배열에서 iteratee 함수의 결과가 최대인 요소를 반환합니다.
 *
 * @param array - 대상 배열
 * @param iteratee - 각 요소에 적용할 함수
 * @returns iteratee 함수의 결과가 최대인 요소
 * @signature
 *  maxBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): T | undefined
 * @example
 *  maxBy([{ n: 1 }, { n: 2 }], o => o.n) // => { n: 2 }
 *  maxBy([{ n: -1 }, { n: -2 }], o => Math.abs(o.n)) // => { n: -2 }
 * @category Array - Math
 */
export function maxBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): T | undefined {
    const len = array.length;
    if (len === 0) return undefined;

    let maxElement = array[0];
    let maxValue = iteratee(maxElement);

    for (let i = 1; i < len; i++) {
        const currentValue = iteratee(array[i]);
        if (currentValue > maxValue) {
            maxElement = array[i];
            maxValue = currentValue;
        }
    }

    return maxElement;
}
