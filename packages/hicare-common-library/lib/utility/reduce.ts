import { isArray, isEmpty, isFunction } from 'lib/guard';

export function reduce<T, U>(
    data: ReadonlyArray<T>,
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number, data: ReadonlyArray<T>) => U,
    initialValue: U,
): U {
    if (!isArray(data)) return initialValue;
    if (!isFunction(callbackfn)) return initialValue;
    if (isEmpty(data)) return initialValue;

    let accumulator = initialValue;
    let currentIndex = 0;

    for (const item of data) {
        accumulator = callbackfn(accumulator, item, currentIndex, data);
        currentIndex++;
    }

    return accumulator;
}
