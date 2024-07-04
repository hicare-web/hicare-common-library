import { slice } from 'lib/utility/slice';

export function chunk<T>(array: T[], size: number): T[][] {
    size = Math.max(size, 0);
    const length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    let index = 0;
    let resIndex = 0;
    const result = new Array(Math.ceil(length / size));
    while (index < length) {
        result[resIndex++] = slice(array, index, (index += size));
    }
    return result;
}
