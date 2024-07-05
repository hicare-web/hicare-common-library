import { isArray, isEmpty, isFunction } from 'lib/utility/guard';
import type { IterableContainer } from 'lib/types';

/**
 * array findIndex를 구현한 함수이며 findIndex 함수를 통해 조건에 맞는 값을 반환한다.
 * @param array
 * @param predicate
 */
export function findIndex<T extends IterableContainer>(
    array: ReadonlyArray<T>,
    predicate: (item: T) => boolean,
): number {
    if (!isArray(array)) return -1;
    if (!isFunction(predicate)) return -1;
    if (!isEmpty(array)) return -1;

    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return i;
        }
    }
    return -1;
}
