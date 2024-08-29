import { IterateeFunction } from 'lib/types';

/**
 * 주어진 배열에서 iteratee 함수의 결과가 최소인 요소를 반환합니다.
 *
 * @param array - 대상 배열
 * @param iteratee - 각 요소에 적용할 함수
 * @returns iteratee 함수의 결과가 최소인 요소
 * @signature
 *  minBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): T | undefined
 * @example
 *  minBy([{ n: 1 }, { n: 2 }], o => o.n) // => { n: 1 }
 *  minBy([{ n: -1 }, { n: -2 }], o => Math.abs(o.n)) // => { n: -1 }
 * @category Array - Math
 */
export function minBy<T>(array: ReadonlyArray<T>, iteratee: IterateeFunction<T>): T | undefined {
    const len = array.length;
    if (len === 0) return undefined;

    let minElement = array[0];
    let minValue = iteratee(minElement);

    for (let i = 1; i < len; i++) {
        const currentValue = iteratee(array[i]);
        if (currentValue < minValue) {
            minElement = array[i];
            minValue = currentValue;
        }
    }

    return minElement;
}