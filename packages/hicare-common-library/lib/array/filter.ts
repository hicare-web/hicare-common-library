import { isArray, isEmpty, isFunction } from 'lib/guard';
import type { IterableContainer } from 'lib/types';

/**
 * array filter를 구현한 함수이며 filter 함수를 통해 조건에 맞는 값을 반환한다.
 * array가 아닌 경우 array를 반환하고 filter가 함수가 아닌 경우 array를 반환한다.
 * array가 비어있는 경우 array를 반환한다.
 * @param array
 * @param filter
 */
export function filter<T extends IterableContainer>(
    array: ReadonlyArray<T>,
    filter: (item: T, index?: number, list?: T[]) => boolean,
): T[] {
    if (!isArray(array)) return array as T[];
    if (!isFunction(filter)) return array as T[];
    if (!isEmpty(array)) return array as T[];

    const length = array.length;
    const result = new Array(length);
    let resultIndex = 0;
    let i = 0;

    for (i = 0; i < length; i++) {
        const value = array[i];
        if (filter(value, i, array as T[])) {
            result[resultIndex++] = value;
        }
    }

    result.length = resultIndex;

    return result;
}
