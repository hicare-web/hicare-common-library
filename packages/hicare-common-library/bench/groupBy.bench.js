import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { chunkBenchOption } from './option/benchOption';
import { groupBy as remedaGroupBy, prop } from 'remeda';
import { groupBy as lodashGroupBy, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

function nativeForGroupBy(array, keyFn) {
    const result = {};
    const length = array.length;

    for (let i = 0; i < length; i++) {
        const item = array[i];
        const key = keyFn(item);

        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    }

    return result;
}

function nativeWhileGroupBy(array, keyFn) {
    // WIN
    const result = {};
    const length = array.length;
    let i = 0;

    while (i < length) {
        const item = array[i];
        const key = keyFn(item);

        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        i++;
    }

    return result;
}

function nativeWhileGroupBy2(array, keyFn) {
    const map = new Map();
    const length = array.length;
    let i = 0;

    while (i < length) {
        const item = array[i];
        const key = keyFn(item);

        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(item);
        i++;
    }

    return Object.fromEntries(map);
}

function optimizedGroupBy(array, keyFn) {
    const result = Object.create(null); // 프로토타입 없는 순수한 객체 생성
    const length = array.length;

    for (let i = 0; i < length; i++) {
        const item = array[i];
        const key = keyFn(item);

        (result[key] || (result[key] = [])).push(item);
    }

    return result;
}

const a = nativeForGroupBy(objectList, (item) => item.name);
const b = nativeWhileGroupBy(objectList, (item) => item.name);
const c = remedaGroupBy(objectList, prop('name'));
const d = lodashGroupBy(objectList, (item) => item.name);
const e = nativeWhileGroupBy2(objectList, (item) => item.name);
const f = optimizedGroupBy(objectList, (item) => item.name);

console.log(isEqual(a, b));
console.log(isEqual(a, c));
console.log(isEqual(a, d));
console.log(isEqual(a, e));
console.log(isEqual(a, f));

describe('groupBy', () => {
    bench(
        'nativeForGroupBy',
        () => {
            nativeForGroupBy(objectList, (item) => item.name);
        },
        chunkBenchOption,
    );

    bench(
        'nativeWhileGroupBy',
        () => {
            nativeWhileGroupBy(objectList, (item) => item.name);
        },
        chunkBenchOption,
    );

    bench(
        'nativeWhileGroupBy2',
        () => {
            nativeWhileGroupBy2(objectList, (item) => item.name);
        },
        chunkBenchOption,
    );

    bench(
        'optimizedGroupBy',
        () => {
            optimizedGroupBy(objectList, (item) => item.name);
        },
        chunkBenchOption,
    );

    bench(
        'remedaGroupBy',
        () => {
            remedaGroupBy(objectList, prop('name'));
        },
        chunkBenchOption,
    );

    bench(
        'lodashGroupBy',
        () => {
            lodashGroupBy(objectList, (item) => item.name);
        },
        chunkBenchOption,
    );
});
