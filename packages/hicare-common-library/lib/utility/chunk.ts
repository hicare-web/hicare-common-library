import { slice } from 'lib/utility/slice';

/**
 * 크기의 길이만큼 그룹으로 분할된 요소 배열을 생성합니다. 배열을 균등하게 분할할 수 없는 경우 최종 청크는 나머지 요소가 됩니다.
 * @param array
 * @param size
 */
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
