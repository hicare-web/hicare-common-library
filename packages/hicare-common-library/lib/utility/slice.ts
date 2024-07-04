/**
 * '시작'에서 '끝'까지의 '배열' 조각을 생성합니다(단, '끝'은 포함하지 않음).
 * @param array
 * @param start
 * @param end
 */
export function slice<T>(array: T[], start: number, end: number): T[] {
    let length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }

    start = start == null ? 0 : start;
    end = end === undefined ? length : end;

    if (start < 0) {
        start = -start > length ? 0 : length + start;
    }

    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : (end - start) >>> 0;
    start >>>= 0;

    let index = -1;
    const result = new Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}
