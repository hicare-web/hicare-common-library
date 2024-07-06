export type Comparator<T> = (a: T, b: T) => number;
export type IterateeFunction<T> = (value: T) => any;
export type IterateeShorthand<T> = keyof T;
export type Order = 'asc' | 'desc';

function createComparator<T>(
    iterateesLength: number,
    cache: any[][],
    normalizedIteratees: IterateeFunction<T>[],
    collection: readonly T[],
    normalizedOrders: Int8Array,
): Comparator<number> {
    return (indexA: number, indexB: number): number => {
        for (let i = 0; i < iterateesLength; i++) {
            let valueA = cache[indexA][i];
            if (valueA === undefined) {
                valueA = normalizedIteratees[i](collection[indexA]);
                cache[indexA][i] = valueA;
            }

            let valueB = cache[indexB][i];
            if (valueB === undefined) {
                valueB = normalizedIteratees[i](collection[indexB]);
                cache[indexB][i] = valueB;
            }

            if (valueA !== valueB) {
                return (valueA > valueB ? 1 : -1) * normalizedOrders[i];
            }
        }
        return 0;
    };
}

export function orderBy<T extends object>(
    collection: readonly T[],
    iteratees: ReadonlyArray<IterateeFunction<T> | IterateeShorthand<T>>,
    orders?: ReadonlyArray<Order>,
): T[] {
    if (!Array.isArray(collection)) {
        throw new TypeError('첫 번째 인자는 반드시 배열이어야 합니다');
    }

    const length = collection.length;
    const iterateesLength = iteratees.length;

    // 정렬에 사용할 보조 배열 생성
    const indexes = new Int32Array(length);
    for (let i = 0; i < length; i++) {
        indexes[i] = i;
    }

    // iteratees를 함수 배열로 정규화 및 메모이제이션
    const normalizedIteratees: IterateeFunction<T>[] = new Array(iterateesLength);
    // orders를 1(오름차순) 또는 -1(내림차순)로 정규화 및 메모이제이션
    const normalizedOrders = new Int8Array(iterateesLength);

    for (let i = 0; i < iterateesLength; i++) {
        const iteratee = iteratees[i];
        if (typeof iteratee === 'function') {
            normalizedIteratees[i] = iteratee as IterateeFunction<T>;
        } else {
            normalizedIteratees[i] = (obj: T) => obj[iteratee as keyof T];
        }

        normalizedOrders[i] = orders && orders[i] === 'desc' ? -1 : 1;
    }

    // 메모이제이션을 위한 캐시
    const cache: any[][] = new Array(length);
    for (let i = 0; i < length; i++) {
        cache[i] = new Array(iterateesLength);
    }

    // 정렬 함수
    const comparator = createComparator(iterateesLength, cache, normalizedIteratees, collection, normalizedOrders);

    // 인덱스 배열 정렬
    indexes.sort(comparator);

    // 정렬된 인덱스를 사용하여 새 배열 생성
    const result: T[] = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = collection[indexes[i]];
    }

    return result;
}
