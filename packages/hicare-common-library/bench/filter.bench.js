import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { filter as remedaFilter } from 'remeda';
import { filter as lodashFilter, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

function nativeWhileFilter(list, callback) {
    const length = list.length;

    const result = new Array(length);
    let resultIndex = 0;
    let i = 0;

    while (i < length) {
        const value = list[i];
        if (callback(value, i, list)) {
            result[resultIndex++] = value;
        }
        i++;
    }

    return result;
}

function nativeForFilter(list, callback) { // WIN!!
    const length = list.length;
    const result = new Array(length);
    let resultIndex = 0;
    let i = 0;

    for (i = 0; i < length; i++) {
        const value = list[i];
        if (callback(value, i, list)) {
            result[resultIndex++] = value;
        }
    }

    return result;
}

const a = nativeWhileFilter(objectList, (obj) => obj.id.value > 5);
const b = objectList.filter((obj) => obj.id.value > 5);
const c = remedaFilter(objectList, (obj) => obj.id.value > 5);
const d = lodashFilter(objectList, (obj) => obj.id.value > 5);
const e = nativeForFilter(objectList, (obj) => obj.id.value > 5);

console.log(`js filer : while loop filter : ${isEqual(a, b)}`);
console.log(`js filer : remeda filter : ${isEqual(a, c)}`);
console.log(`js filer : lodash filter : ${isEqual(a, d)}`);
console.log(`js filer : for loop filter : ${isEqual(a, e)}`);


describe('Filter', () => {
    bench(
        'native js filter',
        () => {
            objectList.filter((obj) => obj.id.value > 5);
        },
        mapBenchOption,
    );

    bench(
        'while loop filter',
        () => {
            nativeWhileFilter(objectList, (obj) => obj.id.value > 5);
        },
        mapBenchOption,
    );

    bench(
        'for loop filter',
        () => {
            nativeForFilter(objectList, (obj) => obj.id.value > 5);
        },
        mapBenchOption,
    );

    bench(
        'remeda filter',
        () => {
            remedaFilter(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        mapBenchOption,
    );

    bench(
        'lodash filter',
        () => {
            lodashFilter(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        mapBenchOption,
    );
});