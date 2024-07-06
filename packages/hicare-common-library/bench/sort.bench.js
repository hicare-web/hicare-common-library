import { isEqual, orderBy as lodashOrderBy } from 'lodash-es';
import { prop, sortBy as remedaOrderBy } from 'remeda';
import { generatorRandomObject } from './internal/createObject';
import { performance } from 'perf_hooks';
import { bench, describe } from 'vitest';
import { sortBenchOption } from './option/benchOption';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}
/**
 * 주어진 기준에 따라 배열을 정렬합니다.
 *
 * @template T
 * @param {T[]} collection - 정렬할 배열
 * @param {(string | function(T): *)[]} iteratees - 정렬 기준. 각 요소는 객체 속성 이름(문자열) 또는 값을 반환하는 함수입니다.
 * @param {('asc' | 'desc')[]} [orders] - 각 정렬 기준의 정렬 순서. 기본값은 모두 'asc'(오름차순)입니다.
 * @returns {T[]} 정렬된 새 배열
 *
 * @example
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // 사용자 이름으로 오름차순 정렬 후, 나이로 내림차순 정렬
 * orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'barney', 'age': 34 },
 * //     { 'user': 'fred', 'age': 48 }, { 'user': 'fred', 'age': 40 }]
 */
/**
 * 주어진 기준에 따라 배열을 정렬합니다.
 *
 * @template T
 * @param {T[]} collection - 정렬할 배열
 * @param {(string | function(T): *)[]} iteratees - 정렬 기준. 각 요소는 객체 속성 이름(문자열) 또는 값을 반환하는 함수입니다.
 * @param {('asc' | 'desc')[]} [orders] - 각 정렬 기준의 정렬 순서. 기본값은 모두 'asc'(오름차순)입니다.
 * @returns {T[]} 정렬된 새 배열
 */
/**
 * 주어진 기준에 따라 배열을 정렬합니다.
 *
 * @param {Array} collection - 정렬할 배열
 * @param {(string|function)[]} iteratees - 정렬 기준. 각 요소는 객체 속성 이름(문자열) 또는 값을 반환하는 함수입니다.
 * @param {('asc'|'desc')[]} [orders] - 각 정렬 기준의 정렬 순서. 기본값은 모두 'asc'(오름차순)입니다.
 * @returns {Array} 정렬된 새 배열
 */
function orderBy2(collection, iteratees, orders) {
    const len = collection.length;
    const result = new Array(len);
    const iterateesLen = iteratees.length;
    const ordersLen = orders ? orders.length : 0;

    // 정렬에 사용할 보조 배열 생성
    const indexes = new Array(len);
    for (let i = 0; i < len; i++) {
        indexes[i] = i;
        result[i] = collection[i];
    }

    // iteratees와 orders 정규화
    const normalizedIteratees = new Array(iterateesLen);
    const normalizedOrders = new Array(iterateesLen);
    for (let i = 0; i < iterateesLen; i++) {
        normalizedIteratees[i] = typeof iteratees[i] === 'function' ? iteratees[i] : (item) => item[iteratees[i]];
        normalizedOrders[i] = i < ordersLen && orders[i] === 'desc' ? -1 : 1;
    }

    // 정렬 함수
    function comparator(indexA, indexB) {
        for (let i = 0; i < iterateesLen; i++) {
            const iteratee = normalizedIteratees[i];
            const valueA = iteratee(collection[indexA]);
            const valueB = iteratee(collection[indexB]);

            if (valueA !== valueB) {
                return (valueA > valueB ? 1 : -1) * normalizedOrders[i];
            }
        }
        return 0;
    }

    // 빠른 정렬 구현
    function quickSort(arr, left, right) {
        if (left < right) {
            const pivot = partition(arr, left, right);
            quickSort(arr, left, pivot - 1);
            quickSort(arr, pivot + 1, right);
        }
    }

    function partition(arr, left, right) {
        const pivot = arr[right];
        let i = left - 1;

        for (let j = left; j < right; j++) {
            if (comparator(arr[j], pivot) <= 0) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
        return i + 1;
    }

    // 정렬 실행
    quickSort(indexes, 0, len - 1);

    // 정렬된 결과 생성
    for (let i = 0; i < len; i++) {
        result[i] = collection[indexes[i]];
    }

    return result;
}

function orderBy(collection, iteratees, orders) {
    if (!Array.isArray(collection)) {
        throw new TypeError('첫 번째 인자는 반드시 배열이어야 합니다');
    }

    const length = collection.length;
    const iterateesLength = iteratees.length;

    // 정렬에 사용할 보조 배열 생성
    const indexes = new Array(length);
    for (let i = 0; i < length; i++) {
        indexes[i] = i;
    }

    // iteratees를 함수 배열로 정규화 및 메모이제이션
    const normalizedIteratees = new Array(iterateesLength);
    for (let i = 0; i < iterateesLength; i++) {
        const iteratee = iteratees[i];
        if (typeof iteratee === 'function') {
            normalizedIteratees[i] = iteratee;
        } else {
            normalizedIteratees[i] = (obj) => obj[iteratee];
        }
    }

    // orders를 1(오름차순) 또는 -1(내림차순)로 정규화 및 메모이제이션
    const normalizedOrders = new Array(iterateesLength);
    for (let i = 0; i < iterateesLength; i++) {
        normalizedOrders[i] = orders && orders[i] === 'desc' ? -1 : 1;
    }

    // 메모이제이션을 위한 캐시
    const cache = new Array(length);
    for (let i = 0; i < length; i++) {
        cache[i] = new Array(iterateesLength);
    }

    // 정렬 함수
    const comparator = (indexA, indexB) => {
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

    // 인덱스 배열 정렬
    indexes.sort(comparator);

    // 정렬된 인덱스를 사용하여 새 배열 생성
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = collection[indexes[i]];
    }

    return result;
}

function createComparator(iterateesLength, cache, normalizedIteratees, collection, normalizedOrders) {
    return (indexA, indexB) => {
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

function orderBy3(collection, iteratees, orders) { // WIN
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
    const normalizedIteratees = new Array(iterateesLength);
    // orders를 1(오름차순) 또는 -1(내림차순)로 정규화 및 메모이제이션
    const normalizedOrders = new Array(iterateesLength);

    for (let i = 0; i < iterateesLength; i++) {
        const iteratee = iteratees[i];
        if (typeof iteratee === 'function') {
            normalizedIteratees[i] = iteratee;
        } else {
            normalizedIteratees[i] = (obj) => obj[iteratee];
        }

        normalizedOrders[i] = orders && orders[i] === 'desc' ? -1 : 1;
    }

    // 메모이제이션을 위한 캐시
    const cache = new Array(length);
    for (let i = 0; i < length; i++) {
        cache[i] = new Array(iterateesLength);
    }

    // 정렬 함수
    const comparator = createComparator(iterateesLength, cache, normalizedIteratees, collection, normalizedOrders);

    // 인덱스 배열 정렬
    indexes.sort(comparator);

    // 정렬된 인덱스를 사용하여 새 배열 생성
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = collection[indexes[i]];
    }

    return result;
}

function orderBy4(collection, iteratees, orders) {
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
    const normalizedIteratees = new Array(iterateesLength);
    // orders를 1(오름차순) 또는 -1(내림차순)로 정규화 및 메모이제이션
    const normalizedOrders = new Uint8Array(iterateesLength);

    for (let i = 0; i < iterateesLength; i++) {
        const iteratee = iteratees[i];
        if (typeof iteratee === 'function') {
            normalizedIteratees[i] = iteratee;
        } else {
            normalizedIteratees[i] = (obj) => obj[iteratee];
        }

        normalizedOrders[i] = orders && orders[i] === 'desc' ? -1 : 1;
    }

    // 메모이제이션을 위한 캐시
    const cache = new Array(length);
    for (let i = 0; i < length; i++) {
        cache[i] = new Array(iterateesLength);
    }

    // 정렬 함수
    const comparator = createComparator(iterateesLength, cache, normalizedIteratees, collection, normalizedOrders);

    // 인덱스 배열 정렬
    indexes.sort(comparator);

    // 정렬된 인덱스를 사용하여 새 배열 생성
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = collection[indexes[i]];
    }

    return result;
}

// WeakMap을 사용한 캐시 구현
const cacheMap = new WeakMap();

function createComparatorCache(iterateesLength, normalizedIteratees, collection, normalizedOrders) {
    return (indexA, indexB) => {
        for (let i = 0; i < iterateesLength; i++) {
            let valueA = cacheMap.get(collection[indexA])?.get(i);
            if (valueA === undefined) {
                valueA = normalizedIteratees[i](collection[indexA]);
                if (!cacheMap.has(collection[indexA])) {
                    cacheMap.set(collection[indexA], new Map());
                }
                cacheMap.get(collection[indexA]).set(i, valueA);
            }

            let valueB = cacheMap.get(collection[indexB])?.get(i);
            if (valueB === undefined) {
                valueB = normalizedIteratees[i](collection[indexB]);
                if (!cacheMap.has(collection[indexB])) {
                    cacheMap.set(collection[indexB], new Map());
                }
                cacheMap.get(collection[indexB]).set(i, valueB);
            }

            if (valueA !== valueB) {
                return (valueA > valueB ? 1 : -1) * normalizedOrders[i];
            }
        }
        return 0;
    };
}

function orderByCache(collection, iteratees, orders) {
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
    const normalizedIteratees = new Array(iterateesLength);
    // orders를 1(오름차순) 또는 -1(내림차순)로 정규화 및 메모이제이션
    const normalizedOrders = new Array(iterateesLength);

    for (let i = 0; i < iterateesLength; i++) {
        const iteratee = iteratees[i];
        if (typeof iteratee === 'function') {
            normalizedIteratees[i] = iteratee;
        } else {
            normalizedIteratees[i] = (obj) => obj[iteratee];
        }

        normalizedOrders[i] = orders && orders[i] === 'desc' ? -1 : 1;
    }
    // 정렬 함수
    const comparator = createComparatorCache(iterateesLength, normalizedIteratees, collection, normalizedOrders);

    // 인덱스 배열 정렬
    indexes.sort(comparator);

    // 정렬된 인덱스를 사용하여 새 배열 생성
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = collection[indexes[i]];
    }

    return result;
}

function quickSort(array, key) {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[Math.floor(array.length / 2)][key];
    const left = [];
    const right = [];
    const middle = [];

    for (const item of array) {
        if (item[key] < pivot) {
            left.push(item);
        } else if (item[key] > pivot) {
            right.push(item);
        } else {
            middle.push(item);
        }
    }

    return [...quickSort(left, key), ...middle, ...quickSort(right, key)];
}

function radixSort(array, key) {
    if (array.length <= 1) {
        return array;
    }

    // 최대 자릿수 찾기
    let maxDigit = 0;
    for (const item of array) {
        const digitCount = item[key].toString().length;
        maxDigit = Math.max(maxDigit, digitCount);
    }

    // 자릿수 기준으로 정렬
    for (let digit = 0; digit < maxDigit; digit++) {
        const buckets = Array.from({ length: 10 }, () => []);

        for (const item of array) {
            const digitValue = Math.floor(item[key] / Math.pow(10, digit)) % 10;
            buckets[digitValue].push(item);
        }

        array = [].concat(...buckets);
    }

    return array;
}

const javascriptSortObjectListCopy = [...objectList];
const quickSortObjectListCopy = [...objectList];
const radixSortObjectListCopy = [...objectList];
const nativeOrderByObjectListCopy = [...objectList];
const nativeOrderByObjectListCopy3 = [...objectList];
const nativeOrderByObjectListCopy4 = [...objectList];
const nativeOrderByObjectListCopy5 = [...objectList];
const lodashOrderByObjectListCopy = [...objectList];
const remedaOrderByObjectListCopy = [...objectList];

const javascriptSort = javascriptSortObjectListCopy.sort((a, b) => {
    return a.value - b.value;
});
const quickSortObjectList = quickSort(quickSortObjectListCopy, 'value');
const radixSortList = radixSort(radixSortObjectListCopy, 'value');
const nativeOrderBy = orderBy(nativeOrderByObjectListCopy, ['value'], ['asc']);
const nativeOrderBy3 = orderBy2(nativeOrderByObjectListCopy3, ['value'], ['asc']);
const nativeOrderBy4 = orderBy3(nativeOrderByObjectListCopy4, ['value'], ['asc']);
const nativeOrderBy5 = orderBy4(nativeOrderByObjectListCopy5, ['value'], ['asc']);
const lodashOrderByList = lodashOrderBy(lodashOrderByObjectListCopy, ['value'], ['asc']);
const remedaOrderByList = remedaOrderBy(remedaOrderByObjectListCopy, [prop('value'), 'asc']);

console.log(isEqual(javascriptSort, quickSortObjectList));
console.log(isEqual(javascriptSort, radixSortList));
console.log(isEqual(quickSortObjectList, radixSortList));
console.log(isEqual(javascriptSort, nativeOrderBy));
console.log(isEqual(javascriptSort, lodashOrderByList));
console.log(isEqual(javascriptSort, remedaOrderByList));
console.log(isEqual(javascriptSort, nativeOrderBy3));
console.log(isEqual(javascriptSort, nativeOrderBy4));
console.log(isEqual(javascriptSort, nativeOrderBy5));

const loopCount = 3000;
const t0 = performance.now();
//'lodash orderBy',
for (let i = 0; i < loopCount; i++) {
    const _objectList = [...objectList];
    lodashOrderBy(_objectList, ['value'], ['asc']);
}
const t0End = performance.now();

const t2 = performance.now();
//'remeda orderBy',
for (let i = 0; i < loopCount; i++) {
    const _objectList = [...objectList];
    remedaOrderBy(_objectList, [prop('value'), 'asc']);
}
const t2End = performance.now();

const t3 = performance.now();
//'orderBy',
for (let i = 0; i < loopCount; i++) {
    const _objectList = [...objectList];
    orderBy(_objectList, ['value'], ['asc']);
}
const t3End = performance.now();

const t6 = performance.now();
//'orderBy3',
for (let i = 0; i < loopCount; i++) {
    const _objectList = [...objectList];
    orderBy3(_objectList, ['value'], ['asc']);
}
const t6End = performance.now();

const t7 = performance.now();
//'orderBy4',
for (let i = 0; i < loopCount; i++) {
    const _objectList = [...objectList];
    orderByCache(_objectList, ['value'], ['asc']);
}
const t7End = performance.now();

const t8 = performance.now();
// 'orderBy5',
for (let i = 0; i < loopCount; i++) {
    const _objectList = [...objectList];
    orderBy4(_objectList, ['value'], ['asc']);
}
const t8End = performance.now();

console.log('lodash orderBy', t0End - t0);
console.log('remeda orderBy', t2End - t2);
console.log('orderBy', t3End - t3);
console.log('orderBy3', t6End - t6);
console.log('orderBy4', t7End - t7);
console.log('orderBy5', t8End - t8);

describe('Sort', () => {
    bench(
        'lodash orderBy',
        () => {
            const _objectList = [...objectList];
            lodashOrderBy(_objectList, ['value'], ['asc']);
        },
        sortBenchOption,
    );

    bench(
        'remeda orderBy',
        () => {
            const _objectList = [...objectList];
            remedaOrderBy(_objectList, [prop('value'), 'asc']);
        },
        sortBenchOption,
    );

    bench(
        'orderBy',
        () => {
            const _objectList = [...objectList];
            orderBy(_objectList, ['value'], ['asc']);
        },
        sortBenchOption,
    );

    bench(
        'orderBy2',
        () => {
            const _objectList = [...objectList];
            orderBy2(_objectList, ['value'], ['asc']);
        },
        sortBenchOption,
    );

    bench(
        'orderBy3',
        () => {
            const _objectList = [...objectList];
            orderBy3(_objectList, ['value'], ['asc']);
        },
        sortBenchOption,
    );

    bench(
        'orderBy4',
        () => {
            const _objectList = [...objectList];
            orderBy4(_objectList, ['value'], ['asc']);
        },
        sortBenchOption,
    );

    bench(
        'orderByCache',
        () => {
            const _objectList = [...objectList];
            orderByCache(_objectList, ['value'], ['asc']);
        },
        sortBenchOption,
    );
});
