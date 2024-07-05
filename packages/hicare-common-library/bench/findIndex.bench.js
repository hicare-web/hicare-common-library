import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { findBenchOption } from './option/benchOption';
import { findIndex as remedaFindIndex } from 'remeda';
import { findIndex as lodashFindIndex, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

function nativeWhileFindIndex(list, callback) {
    const length = list.length;
    let i = 0;

    while (i < length) {
        if (callback(list[i], i, list)) {
            return i;
        }
        i++;
    }

    return -1;
}

function nativeForFindIndex(list, callback) {
    const length = list.length;
    let i = 0;
    for (i = 0; i < length; i++) {
        if (callback(list[i], i, list)) {
            return i;
        }
    }

    return -1;
}

function nativeForFindIndex1(list, callback) {
    const length = list.length;

    for (let i = 0; i < length; i++) {
        if (callback(list[i], i, list)) {
            return i;
        }
    }

    return -1;
}

const a = objectList.findIndex((obj) => obj.id.value > 5);
const b = nativeWhileFindIndex(objectList, (obj) => obj.id.value > 5);
const c = remedaFindIndex(objectList, (obj) => obj.id.value > 5);
const d = lodashFindIndex(objectList, (obj) => obj.id.value > 5);
const e = nativeForFindIndex(objectList, (obj) => obj.id.value > 5);
const f = nativeForFindIndex1(objectList, (obj) => obj.id.value > 5);

console.log(`js FindIndex : native FindIndex : ${isEqual(a, b)}`);
console.log(`js FindIndex : remeda FindIndex : ${isEqual(a, c)}`);
console.log(`js FindIndex : lodash FindIndex : ${isEqual(a, d)}`);
console.log(`js FindIndex : for loop FindIndex : ${isEqual(a, e)}`);
console.log(`js FindIndex : for loop FindIndex1 : ${isEqual(a, f)}`);

describe('FindIndex', () => {
    bench(
        'native js FindIndex',
        () => {
            objectList.findIndex((obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'native while FindIndex',
        () => {
            nativeWhileFindIndex(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'native for FindIndex',
        () => {
            nativeForFindIndex(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'native for FindIndex1',
        () => {
            nativeForFindIndex1(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'remeda FindIndex',
        () => {
            remedaFindIndex(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'lodash FindIndex',
        () => {
            lodashFindIndex(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );
});
