import { isAsync } from 'lib/guard/isAsync';

/**
 * 배열에서 주어진 조건을 만족하는 첫 번째 요소를 반환하는 함수
 *
 * @param array - 검색할 배열
 * @param predicate - 각 요소에 적용할 조건 함수
 * @returns 조건을 만족하는 첫 번째 요소, 없으면 undefined
 * @signature
 *  find<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined
 *  find<T>(array: T[], predicate: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T | undefined>
 * @example
 *  find([1, 2, 3, 4, 5], (num) => num > 3) // => 4
 *  find([1, 2, 3, 4, 5], (num) => num > 10) // => undefined
 *
 *  // 객체 배열 예제
 *  const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 *  find(users, (user) => user.id === 2) // => { id: 2, name: 'Jane' }
 *
 *  // 비동기 예제
 *  const asyncIsEven = async (num) => new Promise<boolean>(resolve => setTimeout(() => resolve(num % 2 === 0), 100));
 *  await find([1, 2, 3, 4, 5], asyncIsEven) // => 2
 * @category Array - Search
 */
export function find<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined;
export function find<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T | undefined>;
export function find<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => boolean | Promise<boolean>,
): T | undefined | Promise<T | undefined> {
    if (array.length === 0) {
        return undefined;
    }

    if (isAsync(predicate)) {
        return asyncFind(array, predicate as (value: T, index: number, array: T[]) => Promise<boolean>);
    }
    return syncFind(array, predicate as (value: T, index: number, array: T[]) => boolean);
}

function syncFind<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        if (predicate(array[i], i, array)) {
            return array[i];
        }
    }
    return undefined;
}

async function asyncFind<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T | undefined> {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        if (await predicate(array[i], i, array)) {
            return array[i];
        }
    }
    return undefined;
}
