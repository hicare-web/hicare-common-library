import { isAsync } from 'lib/guard/isAsync';

export interface ReduceOptions {
    asyncMode?: 'sequential' | 'parallel' | 'allSettled';
}
/**
 * 배열의 각 요소에 대해 리듀서 함수를 실행하여 하나의 결과값을 반환하는 함수
 *
 * @param array - 리듀스할 배열
 * @param reducer - 각 요소에 적용할 리듀서 함수
 * @param initialValue - 초기값 (옵션)
 * @returns 리듀스 결과값
 * @signature
 *  reduce<T, U>(array: T[], reducer: (accumulator: U, currentValue: T, index: number, array: T[]) => U, initialValue: U): U
 *  reduce<T>(array: T[], reducer: (accumulator: T, currentValue: T, index: number, array: T[]) => T): T
 *  reduce<T, U>(array: T[], reducer: (accumulator: U, currentValue: T, index: number, array: T[]) => Promise<U>, initialValue: U): Promise<U>
 *  reduce<T>(array: T[], reducer: (accumulator: T, currentValue: T, index: number, array: T[]) => Promise<T>): Promise<T>
 * @example
 *  reduce([1, 2, 3, 4], (acc, cur) => acc + cur) // => 10
 *  reduce([1, 2, 3, 4], (acc, cur) => acc + cur, 10) // => 20
 *  reduce(['a', 'b', 'c'], (acc, cur) => acc + cur, '') // => 'abc'
 *
 *  // Async example
 *  const asyncSum = async (acc, cur) => new Promise(resolve => setTimeout(() => resolve(acc + cur), 100));
 *  await reduce([1, 2, 3, 4], asyncSum, 0) // => 10
 * @category Array - Reduction
 */
export function reduce<T, U>(
    array: T[],
    reducer: (accumulator: U, currentValue: T, index: number, array: T[]) => U,
    initialValue: U,
): U;
export function reduce<T>(array: T[], reducer: (accumulator: T, currentValue: T, index: number, array: T[]) => T): T;
export function reduce<T, U>(
    array: T[],
    reducer: (accumulator: U, currentValue: T, index: number, array: T[]) => Promise<U>,
    initialValue: U,
    options?: ReduceOptions,
): Promise<U>;
export function reduce<T>(
    array: T[],
    reducer: (accumulator: T, currentValue: T, index: number, array: T[]) => Promise<T>,
    options?: ReduceOptions,
): Promise<T>;
export function reduce<T, U>(
    array: T[],
    reducer: (accumulator: T | U, currentValue: T, index: number, array: T[]) => T | U | Promise<T | U>,
    initialValue?: U,
    options?: ReduceOptions,
): T | U | Promise<T | U> {
    if (array.length === 0 && initialValue === undefined) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    if (isAsync(reducer)) {
        if (options?.asyncMode === 'parallel') {
            return asyncReduceParallel(array, reducer as any, initialValue);
        } else if (options?.asyncMode === 'allSettled') {
            return asyncReduceAllSettled(array, reducer as any, initialValue);
        } else {
            return asyncReduce(array, reducer as any, initialValue);
        }
    }
    return syncReduce(array, reducer as any, initialValue);
}

function syncReduce<T, U>(
    array: T[],
    reducer: (accumulator: T | U, currentValue: T, index: number, array: T[]) => T | U,
    initialValue?: U,
): T | U {
    const len = array.length;
    let accumulator: T | U;
    let startIndex: number;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < len; i++) {
        accumulator = reducer(accumulator, array[i], i, array);
    }

    return accumulator;
}

async function asyncReduce<T, U>(
    array: T[],
    reducer: (accumulator: T | U, currentValue: T, index: number, array: T[]) => Promise<T | U>,
    initialValue?: U,
): Promise<T | U> {
    const len = array.length;
    let accumulator: T | U;
    let startIndex: number;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < len; i++) {
        accumulator = await reducer(accumulator, array[i], i, array);
    }

    return accumulator;
}

async function asyncReduceParallel<T, U>(
    array: T[],
    reducer: (accumulator: T | U, currentValue: T, index: number, array: T[]) => Promise<T | U>,
    initialValue?: U,
): Promise<T | U> {
    const len = array.length;
    let accumulator: T | U;
    let startIndex: number;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0] as T;
        startIndex = 1;
    }

    const promiseContainer: Promise<T | U>[] = new Array(len - startIndex);
    for (let i = startIndex; i < len; i++) {
        promiseContainer[i - startIndex] = reducer(accumulator, array[i], i, array);
    }

    const results = await Promise.all(promiseContainer);
    for (let i = 0; i < results.length; i++) {
        accumulator = results[i];
    }

    return accumulator;
}

async function asyncReduceAllSettled<T, U>(
    array: T[],
    reducer: (accumulator: T | U, currentValue: T, index: number, array: T[]) => Promise<T | U>,
    initialValue?: U,
): Promise<T | U> {
    const len = array.length;
    let accumulator: T | U;
    let startIndex: number;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0] as T;
        startIndex = 1;
    }

    const promiseContainer: Promise<T | U>[] = new Array(len - startIndex);
    for (let i = startIndex; i < len; i++) {
        promiseContainer[i - startIndex] = reducer(accumulator, array[i], i, array);
    }

    const results = await Promise.allSettled(promiseContainer);
    const resultLength = results.length;
    for (let i = 0; i < resultLength; i++) {
        const result = results[i];
        if (result.status === 'fulfilled') {
            accumulator = result.value;
        }
    }

    return accumulator;
}
