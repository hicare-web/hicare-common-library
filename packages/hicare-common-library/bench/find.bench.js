import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { findBenchOption } from './option/benchOption';
import { find as remedaFind } from 'remeda';
import { find as lodashFind, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

function nativeWhileFind(list, callback) {
    const length = list.length;
    let i = 0;

    while (i < length) {
        const value = list[i];
        if (callback(value, i, list)) {
            return value;
        }
        i++;
    }

    return undefined;
}

function nativeForFind(list, callback) {
    const length = list.length;
    let i = 0;

    for (i = 0; i < length; i++) {
        const value = list[i];
        if (callback(value, i, list)) {
            return value;
        }
    }

    return undefined;
}

function nativeForFind1(list, callback) {
    const length = list.length;

    for (let i = 0; i < length; i++) {
        const value = list[i];
        if (callback(value, i, list)) {
            return value;
        }
    }

    return undefined;
}

const a = objectList.find((obj) => obj.id.value > 5);
const b = nativeWhileFind(objectList, (obj) => obj.id.value > 5);
const c = remedaFind(objectList, (obj) => obj.id.value > 5);
const d = lodashFind(objectList, (obj) => obj.id.value > 5);
const e = nativeForFind(objectList, (obj) => obj.id.value > 5);
const f = nativeForFind1(objectList, (obj) => obj.id.value > 5);

console.log(`js find : native find : ${isEqual(a, b)}`);
console.log(`js find : remeda find : ${isEqual(a, c)}`);
console.log(`js find : lodash find : ${isEqual(a, d)}`);
console.log(`js find : for loop find : ${isEqual(a, e)}`);
console.log(`js find : for loop find1 : ${isEqual(a, f)}`);

describe('Find', () => {
    bench(
        'native js find',
        () => {
            objectList.find((obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'native while find',
        () => {
            nativeWhileFind(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'native for find',
        () => {
            nativeForFind(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'native for find1',
        () => {
            nativeForFind1(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'remeda find',
        () => {
            remedaFind(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );

    bench(
        'lodash find',
        () => {
            lodashFind(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        findBenchOption,
    );
});
