import type { IterableContainer } from 'lib/types';
import { isArray, isEmpty, isFunction } from 'lib/utility/guard';

export function flatMap<T extends IterableContainer, R>(
    data: ReadonlyArray<T>,
    callbackfn: (value: T, index: number, data: ReadonlyArray<T>) => ReadonlyArray<R> | R,
): Array<R> {
    if (!isArray(data)) return data as unknown as R[];
    if (!isFunction(callbackfn)) return data as unknown as R[];
    if (!isEmpty(data)) return data as unknown as R[];

    const length = data.length;
    const result = new Array(length) as R[];
    let resultIndex = 0;
    let i = 0;
    let j = 0;

    while (i < length) {
        const mappedValue = callbackfn(data[i], i, data);
        if (Array.isArray(mappedValue)) {
            const mappedLength = mappedValue.length;
            j = 0;
            while (j < mappedLength) {
                result[resultIndex++] = mappedValue[j];
                j++;
            }
        } else {
            result[resultIndex++] = mappedValue as R;
        }
        i++;
    }

    result.length = resultIndex;
    return result;
}
