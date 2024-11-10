import { isAsync } from 'lib/guard/isAsync';

/**
 * 배열에서 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환하는 함수
 *
 * @param array - 검색할 배열
 * @param predicate - 각 요소에 적용할 조건 함수
 * @returns 조건을 만족하는 첫 번째 요소의 인덱스, 없으면 -1
 * @signature
 *  findIndex<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number
 *  findIndex<T>(array: T[], predicate: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<number>
 * @example
 *  findIndex([1, 2, 3, 4, 5], (num) => num > 3) // => 3
 *  findIndex([1, 2, 3, 4, 5], (num) => num > 10) // => -1
 *
 *  // 객체 배열 예제
 *  const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 *  findIndex(users, (user) => user.id === 2) // => 1
 *
 *  // 비동기 예제
 *  const asyncIsEven = async (num) => new Promise<boolean>(resolve => setTimeout(() => resolve(num % 2 === 0), 100));
 *  await findIndex([1, 2, 3, 4, 5], asyncIsEven) // => 1
 * @category Array - Search
 */
export function findIndex<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number;
export function findIndex<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<number>;
export function findIndex<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => boolean | Promise<boolean>,
): number | Promise<number> {
    if (array.length === 0) {
        return -1;
    }

    if (isAsync(predicate)) {
        return asyncFindIndex(array, predicate as (value: T, index: number, array: T[]) => Promise<boolean>);
    }
    return syncFindIndex(array, predicate as (value: T, index: number, array: T[]) => boolean);
}

function syncFindIndex<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        if (predicate(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

async function asyncFindIndex<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<number> {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        if (await predicate(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}
