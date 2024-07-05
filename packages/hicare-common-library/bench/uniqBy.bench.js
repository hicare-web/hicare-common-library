import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { uniqueBy as remedaUniqueBy } from 'remeda';
import { uniqBy as lodashUniqBy, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

function nativeForUniqBy(array, keyFunction) {
    const set = new Set();
    const result = [];
    const length = array.length;
    let i = 0;

    for (i = 0; i < length; i++) {
        const item = array[i];
        const key = keyFunction(item);
        if (!set.has(key)) {
            set.add(key);
            result.push(item);
        }
    }

    return result;
}

function nativeWhileUniqBy(array, keyFunction) {
    const set = new Set();
    const result = [];
    let index = 0;
    const length = array.length;

    while (index < length) {
        const item = array[index];
        const key = keyFunction(item);
        if (!set.has(key)) {
            set.add(key);
            result.push(item);
        }
        index++;
    }

    return result;
}

const a = objectList.filter((obj) => obj.id.value);
const b = nativeForUniqBy(objectList, (obj) => obj.id.value);
const c = nativeWhileUniqBy(objectList, (obj) => obj.id.value);
const d = remedaUniqueBy(objectList, (obj) => obj.id.value);
const e = lodashUniqBy(objectList, (obj) => obj.id.value);

console.log(`js uniqBy : native for : ${JSON.stringify(a) === JSON.stringify(b)}`);
console.log(`js uniqBy : native while : ${JSON.stringify(a) === JSON.stringify(c)}`);
console.log(`js uniqBy : remeda : ${JSON.stringify(a) === JSON.stringify(d)}`);
console.log(`js uniqBy : lodash : ${JSON.stringify(a) === JSON.stringify(e)}`);

describe('UniqueBy', () => {
    bench('js filter uniqBy', () => {
        objectList.filter((obj) => obj.id.value);
    });

    bench('native for uniqBy', () => {
        nativeForUniqBy(objectList, (obj) => obj.id.value);
    });

    bench('native while uniqBy', () => {
        nativeWhileUniqBy(objectList, (obj) => obj.id.value);
    });

    bench(
        'remeda uniqueBy',
        () => {
            remedaUniqueBy(objectList, (obj) => obj.id.value);
        },
        mapBenchOption,
    );

    bench(
        'lodash uniqBy',
        () => {
            lodashUniqBy(objectList, (obj) => obj.id.value);
        },
        mapBenchOption,
    );
});
