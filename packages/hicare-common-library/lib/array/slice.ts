import { isAsync } from 'lib/guard/isAsync';

/**
 * 배열의 일부분을 추출하여 새 배열로 반환합니다.
 *
 * @param array - 추출할 배열 또는 Promise<배열>
 * @param start - 추출을 시작할 인덱스 (기본값: 0)
 * @param end - 추출을 종료할 인덱스 (기본값: 배열의 길이)
 * @returns 추출된 요소들의 새 배열
 * @signature
 *  slice<T>(array: T[], start?: number, end?: number): T[]
 *  slice<T>(array: Promise<T[]>, start?: number, end?: number): Promise<T[]>
 * @example
 *  slice([1, 2, 3, 4, 5], 1, 4) // => [2, 3, 4]
 *  slice(['a', 'b', 'c', 'd'], 1) // => ['b', 'c', 'd']
 *  slice([1, 2, 3], 1, 1) // => []
 *
 *  await slice(Promise.resolve([1, 2, 3, 4, 5]), 1, 4) // => [2, 3, 4]
 * @category Array - Extraction
 */
export function slice<T>(array: T[], start?: number, end?: number): T[];
export function slice<T>(array: Promise<T[]>, start?: number, end?: number): Promise<T[]>;
export function slice<T>(array: T[] | Promise<T[]>, start?: number, end?: number): T[] | Promise<T[]> {
    if (isAsync(array)) {
        return asyncSlice(array, start, end);
    }
    return syncSlice(array, start, end);
}

function syncSlice<T>(array: T[], start: number = 0, end?: number): T[] {
    const len = array.length;

    // 음수 인덱스 처리
    const actualStart = start >= 0 ? start : Math.max(0, len + start);
    const actualEnd = end === undefined ? len : end >= 0 ? Math.min(end, len) : len + end;

    // 시작 인덱스가 배열 길이보다 크거나 같으면 빈 배열 반환
    if (actualStart >= len) {
        return [];
    }

    const result = new Array(Math.max(0, actualEnd - actualStart));
    for (let i = 0; i < result.length; i++) {
        result[i] = array[actualStart + i];
    }

    return result;
}

async function asyncSlice<T>(arrayPromise: Promise<T[]>, start?: number, end?: number): Promise<T[]> {
    const array = await arrayPromise;
    return syncSlice(array, start, end);
}
