import { isAsync } from 'lib/guard/isAsync';

export interface ReduceOptions {
    asyncMode?: 'sequential' | 'parallel' | 'allSettled';
}
/**
 * 배열의 각 요소에 주어진 함수를 적용하고 결과를 1단계 평탄화하여 새로운 배열을 생성하는 함수
 *
 * @param array - 변환할 원본 배열
 * @param transformer - 각 요소에 적용할 변환 함수
 * @returns 변환 및 평탄화된 새로운 배열
 * @signature
 *  flatMap<T, U>(array: T[], transformer: (value: T, index: number, array: T[]) => U | U[]): U[]
 *  flatMap<T, U>(array: T[], transformer: (value: T, index: number, array: T[]) => Promise<U | U[]>): Promise<U[]>
 * @example
 *  flatMap([1, 2, 3], (num) => [num, num * 2]) // => [1, 2, 2, 4, 3, 6]
 *  flatMap(['it's', 'a', 'flat', 'world'], (word) => word.split('')) // => ['i', 't', ''', 's', 'a', 'f', 'l', 'a', 't', 'w', 'o', 'r', 'l', 'd']
 *
 *  // Async example
 *  const asyncDouble = async (num) => new Promise(resolve => setTimeout(() => resolve([num, num * 2]), 100));
 *  await flatMap([1, 2, 3], asyncDouble) // => [1, 2, 2, 4, 3, 6]
 * @category Array - Transformation
 */
export function flatMap<T, U>(array: T[], transformer: (value: T, index: number, array: T[]) => U | U[]): U[];
export function flatMap<T, U>(
    array: T[],
    transformer: (value: T, index: number, array: T[]) => Promise<U | U[]>,
    options?: ReduceOptions,
): Promise<U[]>;
export function flatMap<T, U>(
    array: T[],
    transformer: (value: T, index: number, array: T[]) => U | U[] | Promise<U | U[]>,
    options?: ReduceOptions,
): U[] | Promise<U[]> {
    if (isAsync(transformer)) {
        if (options?.asyncMode === 'parallel') {
            return asyncFlatMapParallel(array, transformer as any);
        } else if (options?.asyncMode === 'allSettled') {
            return asyncFlatMapAllSettled(array, transformer as any);
        }
        return asyncFlatMap(array, transformer as any);
    }
    return syncFlatMap(array, transformer as (value: T, index: number, array: T[]) => U | U[]);
}

function syncFlatMap<T, U>(array: T[], transformer: (value: T, index: number, array: T[]) => U | U[]): U[] {
    const len = array.length;
    const result: U[] = [];
    for (let i = 0; i < len; i++) {
        const transformed = transformer(array[i], i, array);
        if (Array.isArray(transformed)) {
            result.push(...transformed);
        } else {
            result.push(transformed);
        }
    }
    return result;
}

async function asyncFlatMap<T, U>(
    array: T[],
    transformer: (value: T, index: number, array: T[]) => Promise<U | U[]>,
): Promise<U[]> {
    const len = array.length;
    const result: U[] = [];
    for (let i = 0; i < len; i++) {
        const transformed = await transformer(array[i], i, array);
        if (Array.isArray(transformed)) {
            result.push(...transformed);
        } else {
            result.push(transformed);
        }
    }
    return result;
}

async function asyncFlatMapParallel<T, U>(
    array: T[],
    transformer: (value: T, index: number, array: T[]) => Promise<U | U[]>,
): Promise<U[]> {
    const len = array.length;
    const promiseContainer: Promise<U | U[]>[] = [];
    for (let i = 0; i < len; i++) {
        promiseContainer[i] = transformer(array[i], i, array);
    }
    const result = await Promise.all(promiseContainer);
    const resultLength = result.length;
    const flatResult: U[] = new Array(resultLength);
    for (let i = 0; i < resultLength; i++) {
        const transformed = result[i];
        if (Array.isArray(transformed)) {
            flatResult.push(...transformed);
        } else {
            flatResult.push(transformed);
        }
    }

    return flatResult;
}

async function asyncFlatMapAllSettled<T, U>(
    array: T[],
    transformer: (value: T, index: number, array: T[]) => Promise<U | U[]>,
): Promise<U[]> {
    const len = array.length;
    const promiseContainer: Promise<U | U[]>[] = [];
    for (let i = 0; i < len; i++) {
        promiseContainer[i] = transformer(array[i], i, array);
    }
    const result = await Promise.allSettled(promiseContainer);
    const resultLength = result.length;
    const flatResult: U[] = new Array(resultLength);
    for (let i = 0; i < resultLength; i++) {
        const transformed = result[i];
        if (transformed.status === 'fulfilled') {
            const value = transformed.value;
            if (Array.isArray(value)) {
                flatResult.push(...value);
            } else {
                flatResult.push(value);
            }
        }
    }

    return flatResult;
}
