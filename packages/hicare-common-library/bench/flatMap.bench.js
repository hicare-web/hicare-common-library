import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { flatMap as remedaFlatMap } from 'remeda';
import { flatMap as lodashFlatMap, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

function nativeForFlatMap(array, callback) {
    const length = array.length;
    const result = new Array(length);
    let i = 0;
    let resultIndex = 0;

    for (i = 0; i < length; i++) {
        const mappedValue = callback(array[i], i, array);
        if (Array.isArray(mappedValue)) {
            for (let j = 0; j < mappedValue.length; j++) {
                result[resultIndex++] = mappedValue[j];
            }
        } else {
            result[resultIndex++] = mappedValue;
        }
    }

    return result;
}

function nativeWhileFlatMap(array, callback) { // WIN!!
    const length = array.length;
    const result = new Array(length);
    let i = 0;
    let j = 0;
    let resultIndex = 0;

    while (i < length) {
        const mappedValue = callback(array[i], i, array);
        if (Array.isArray(mappedValue)) {
            j = 0;
            while (j < mappedValue.length) {
                result[resultIndex++] = mappedValue[j];
                j++;
            }
        } else {
            result[resultIndex++] = mappedValue;
        }
        i++;
    }

    return result;
}

const a = objectList.flatMap((obj) => obj.id.value);
const b = nativeWhileFlatMap(objectList, (obj) => obj.id.value);
const c = remedaFlatMap(objectList, (obj) => obj.id.value);
const d = lodashFlatMap(objectList, (obj) => obj.id.value);
const e = nativeForFlatMap(objectList, (obj) => obj.id.value);

console.log(`js flatMap : while loop flatMap : ${isEqual(a, b)}`);
console.log(`js flatMap : remeda flatMap : ${isEqual(a, c)}`);
console.log(`js flatMap : lodash flatMap : ${isEqual(a, d)}`);
console.log(`js flatMap : for loop flatMap : ${isEqual(a, e)}`);

describe('FlatMap', () => {
    bench(
        'FlatMap',
        () => {
            objectList.flatMap((obj) => obj.id.value);
        },
        mapBenchOption,
    );

    bench(
        'FlatMap - native while loop',
        () => {
            nativeWhileFlatMap(objectList, (obj) => obj.id.value);
        },
        mapBenchOption,
    );

    bench(
        'FlatMap - remeda',
        () => {
            remedaFlatMap(objectList, (obj) => obj.id.value);
        },
        mapBenchOption,
    );

    bench(
        'FlatMap - lodash',
        () => {
            lodashFlatMap(objectList, (obj) => obj.id.value);
        },
        mapBenchOption,
    );

    bench(
        'FlatMap - native for loop',
        () => {
            nativeForFlatMap(objectList, (obj) => obj.id.value);
        },
        mapBenchOption,
    );
});
