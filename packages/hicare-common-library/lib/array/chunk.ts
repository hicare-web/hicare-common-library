import { isAsync } from 'lib/guard/isAsync';

/**
 * 주어진 배열을 지정된 크기의 작은 배열들로 나눕니다.
 *
 * @param array - 나눌 배열 또는 Promise<배열>
 * @param size - 각 청크의 크기 (기본값: 1)
 * @returns 지정된 크기로 나누어진 배열들의 배열
 * @signature
 *  chunk<T>(array: T[], size?: number): T[][]
 *  chunk<T>(array: Promise<T[]>, size?: number): Promise<T[][]>
 * @example
 *  chunk([1, 2, 3, 4, 5], 2) // => [[1, 2], [3, 4], [5]]
 *  chunk(['a', 'b', 'c', 'd'], 3) // => [['a', 'b', 'c'], ['d']]
 *
 *  await chunk(Promise.resolve([1, 2, 3, 4, 5]), 2) // => [[1, 2], [3, 4], [5]]
 * @category Array - Transformation
 */
export function chunk<T>(array: T[], size?: number): T[][];
export function chunk<T>(array: Promise<T[]>, size?: number): Promise<T[][]>;
export function chunk<T>(array: T[] | Promise<T[]>, size: number = 1): T[][] | Promise<T[][]> {
    if (isAsync(array)) {
        return asyncChunk(array, size);
    }
    return syncChunk(array, size);
}

function syncChunk<T>(array: T[], size: number): T[][] {
    const len = array.length;
    if (size <= 0) {
        throw new Error('Chunk size must be greater than 0');
    }

    const chunks: T[][] = new Array(Math.ceil(len / size));
    for (let i = 0; i < len; i += size) {
        chunks[i / size] = array.slice(i, i + size);
    }

    return chunks;
}

async function asyncChunk<T>(arrayPromise: Promise<T[]>, size: number): Promise<T[][]> {
    const array = await arrayPromise;
    return syncChunk(array, size);
}
