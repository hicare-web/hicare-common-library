import { isArray } from 'lib/guard';

export type Comparator<T> = (a: T, b: T) => number;
export type IterateeFunction<T> = (value: T) => any;
export type IterateeShorthand<T> = keyof T;
export type Order = 'asc' | 'desc';

/**
 * 주어진 컬렉션을 하나 이상의 기준에 따라 정렬합니다.
 *
 * @param collection - 정렬할 객체 배열
 * @param iteratees - 정렬 기준을 결정하는 함수 또는 객체 키의 배열
 * @param orders - 각 정렬 기준의 순서를 지정하는 배열 ('asc' 또는 'desc')
 * @returns 정렬된 새 배열
 * @signature
 *  orderBy<T>(collection: readonly T[], iteratees: ReadonlyArray<IterateeFunction<T> | IterateeShorthand<T>>, orders?: ReadonlyArray<Order>): T[]
 *  orderBy<T>(collection: readonly T[], iteratees: ReadonlyArray<(item: T) => Promise<any>>, orders?: ReadonlyArray<Order>): Promise<T[]>
 * @example
 *  const users = [
 *    { user: 'fred',   age: 48 },
 *    { user: 'barney', age: 34 },
 *    { user: 'fred',   age: 40 },
 *    { user: 'barney', age: 36 }
 *  ];
 *
 *  orderBy(users, ['user', 'age'], ['asc', 'desc'])
 *  // => [{ user: 'barney', age: 36 }, { user: 'barney', age: 34 }, { user: 'fred', age: 48 }, { user: 'fred', age: 40 }]
 *
 *  orderBy(users, [u => u.user, u => u.age], ['asc', 'desc'])
 *  // => [{ user: 'barney', age: 36 }, { user: 'barney', age: 34 }, { user: 'fred', age: 48 }, { user: 'fred', age: 40 }]
 *
 *  await orderBy(users, [async u => u.user, async u => u.age], ['asc', 'desc'])
 *  // => [{ user: 'barney', age: 36 }, { user: 'barney', age: 34 }, { user: 'fred', age: 48 }, { user: 'fred', age: 40 }]
 * @category Array - Sort
 */

export function orderBy<T extends object>(
    collection: readonly T[],
    iteratees: ReadonlyArray<IterateeFunction<T> | IterateeShorthand<T>>,
    orders?: ReadonlyArray<Order>,
): T[];
export function orderBy<T extends object>(
    collection: readonly T[],
    iteratees: ReadonlyArray<(item: T) => Promise<T>>,
    orders?: ReadonlyArray<Order>,
): Promise<T[]>;
export function orderBy<T extends object>(
    collection: readonly T[],
    iteratees: ReadonlyArray<IterateeFunction<T> | IterateeShorthand<T>> | ReadonlyArray<(item: T) => Promise<T>>,
    orders?: ReadonlyArray<Order>,
): T[] | Promise<T[]> {
    if (iteratees.some((iteratee) => isArray(iteratee))) {
        return orderByAsync(collection, iteratees as ReadonlyArray<(item: T) => Promise<any>>, orders);
    }
    return orderBySync(collection, iteratees as ReadonlyArray<IterateeFunction<T> | IterateeShorthand<T>>, orders);
}

function orderBySync<T extends object>(
    collection: readonly T[],
    iteratees: ReadonlyArray<IterateeFunction<T> | IterateeShorthand<T>>,
    orders?: ReadonlyArray<Order>,
): T[] {
    const normalizedIteratees = normalizeIteratees(iteratees);
    const normalizedOrders = normalizeOrders(orders, iteratees.length);
    const indexes = createIndexArray(collection.length);
    const cache = createCache(collection.length, iteratees.length);

    const comparator = createComparator(normalizedIteratees, collection, normalizedOrders, cache);

    indexes.sort(comparator);

    return createSortedArray(collection, indexes);
}

async function orderByAsync<T extends object>(
    collection: readonly T[],
    iteratees: ReadonlyArray<(item: T) => Promise<any>>,
    orders?: ReadonlyArray<Order>,
): Promise<T[]> {
    const normalizedOrders = normalizeOrders(orders, iteratees.length);
    const indexes = createIndexArray(collection.length);
    const cache = await createAsyncCache(collection, iteratees);

    const comparator = createAsyncComparator(normalizedOrders, cache);

    indexes.sort(comparator);

    return createSortedArray(collection, indexes);
}

function normalizeIteratees<T>(
    iteratees: ReadonlyArray<IterateeFunction<T> | IterateeShorthand<T>>,
): IterateeFunction<T>[] {
    return iteratees.map((iteratee) =>
        typeof iteratee === 'function' ? (iteratee as IterateeFunction<T>) : (obj: T) => obj[iteratee as keyof T],
    );
}

function normalizeOrders(orders: ReadonlyArray<Order> | undefined, length: number): Int8Array {
    const normalizedOrders = new Int8Array(length);
    for (let i = 0; i < length; i++) {
        normalizedOrders[i] = orders && orders[i] === 'desc' ? -1 : 1;
    }
    return normalizedOrders;
}

function createIndexArray(length: number): Int32Array {
    const indexes = new Int32Array(length);
    for (let i = 0; i < length; i++) {
        indexes[i] = i;
    }
    return indexes;
}

function createCache(collectionLength: number, iterateesLength: number): any[][] {
    const cache: any[][] = new Array(collectionLength);
    for (let i = 0; i < collectionLength; i++) {
        cache[i] = new Array(iterateesLength);
    }
    return cache;
}

async function createAsyncCache<T>(
    collection: readonly T[],
    iteratees: ReadonlyArray<(item: T) => Promise<any>>,
): Promise<any[][]> {
    const cache: any[][] = [];
    for (const item of collection) {
        const row = await Promise.all(iteratees.map((iteratee) => iteratee(item)));
        cache.push(row);
    }
    return cache;
}

function createComparator<T>(
    normalizedIteratees: IterateeFunction<T>[],
    collection: readonly T[],
    normalizedOrders: Int8Array,
    cache: any[][],
): Comparator<number> {
    return (indexA: number, indexB: number): number => {
        for (let i = 0; i < normalizedIteratees.length; i++) {
            const valueA = getOrComputeValue(normalizedIteratees[i], collection[indexA], cache[indexA], i);
            const valueB = getOrComputeValue(normalizedIteratees[i], collection[indexB], cache[indexB], i);

            if (valueA !== valueB) {
                return (valueA > valueB ? 1 : -1) * normalizedOrders[i];
            }
        }
        return 0;
    };
}

function getOrComputeValue<T>(iteratee: IterateeFunction<T>, item: T, cacheRow: any[], index: number): any {
    if (cacheRow[index] === undefined) {
        cacheRow[index] = iteratee(item);
    }
    return cacheRow[index];
}

function createAsyncComparator(normalizedOrders: Int8Array, cache: any[][]): Comparator<number> {
    return (indexA: number, indexB: number): number => {
        for (let i = 0; i < normalizedOrders.length; i++) {
            const valueA = cache[indexA][i];
            const valueB = cache[indexB][i];

            if (valueA !== valueB) {
                return (valueA > valueB ? 1 : -1) * normalizedOrders[i];
            }
        }
        return 0;
    };
}

function createSortedArray<T>(collection: readonly T[], indexes: Int32Array): T[] {
    const result: T[] = new Array(collection.length);
    for (let i = 0; i < collection.length; i++) {
        result[i] = collection[indexes[i]];
    }
    return result;
}
