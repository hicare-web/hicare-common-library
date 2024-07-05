import { isArray, isEmpty, isFunction } from 'lib/utility/guard';
import type { IterableContainer, Mapped } from 'lib/types';

/**
 * array map을 구현한 함수이며 map 함수를 통해 값을 변환한다.
 * array가 아닌 경우 array를 반환하고 map이 함수가 아닌 경우 array를 반환한다.
 * array가 비어있는 경우 array를 반환한다.
 * @param array
 * @param map
 */

export function map<T extends IterableContainer, R>(
    array: ReadonlyArray<T>,
    map: (item: T, index?: number, list?: ReadonlyArray<T>) => R,
): Mapped<T, R> {
    if (!isArray(array)) return array as Mapped<T, R>;
    if (!isFunction(map)) return array as Mapped<T, R>;
    if (!isEmpty(array)) return array as Mapped<T, R>;

    const length = array.length;
    const result = new Array(length) as Mapped<T, R>;
    let i = 0;

    for (i = 0; i < length; i++) {
        result[i] = map(array[i], i, array);
    }

    return result;
}
