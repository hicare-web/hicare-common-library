import type { IterableContainer } from 'lib/types';
import { isArray, isEmpty, isFunction } from 'lib/utility/guard';

/**
 * array find를 구현한 함수이며 find 함수를 통해 조건에 맞는 값을 반환한다.
 * @param arr
 * @param predicate
 */
export function find<T extends IterableContainer>(
    arr: ReadonlyArray<T>,
    predicate: (item: T) => boolean,
): T | undefined {
    if (!isArray(arr)) return undefined;
    if (!isFunction(predicate)) return undefined;
    if (isEmpty(arr)) return undefined;

    for (const item of arr) {
        if (predicate(item)) {
            return item;
        }
    }
    return undefined;
}
