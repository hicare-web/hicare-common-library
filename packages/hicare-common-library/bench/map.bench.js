import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { map as remedaMap } from 'remeda';
import { map as lodashMap } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

function nativeWhileMap(list, callback) {
    const length = list.length;

    const result = new Array(length);
    let i = 0;
    let resultIndex = 0;

    while (i < length) {
        result[resultIndex++] = callback(list[i], i, list);
        i++;
    }

    return result;
}

function nativeWhileMap1(list, callback) { // WIN!!
    const length = list.length;

    const result = new Array(length);
    let i = 0;
    let resultIndex = 0;

    while (i < length) {
        result[i] = callback(list[i], i, list);
        i++;
    }

    return result;
}

function nativeForMap( list, callback) {
    const length = list.length;
    const result = new Array(length);
    let i = 0;
    let resultIndex = 0;

    for (i = 0; i < length; i++) {
        result[resultIndex++] = callback(list[i], i, list);
    }

    return result;

}

const a = objectList.map((obj) => obj.id.value);
const b = nativeWhileMap(objectList, (obj) => obj.id.value);
const c = remedaMap(objectList, (obj) => obj.id.value);
const d = lodashMap(objectList, (obj) => obj.id.value);
const e = nativeForMap(objectList, (obj) => obj.id.value);
const f = nativeWhileMap1(objectList, (obj) => obj.id.value);

console.log(`js map : native map : ${JSON.stringify(a) === JSON.stringify(b)}`);
console.log(`js map : remeda map : ${JSON.stringify(a) === JSON.stringify(c)}`);
console.log(`js map : lodash map : ${JSON.stringify(a) === JSON.stringify(d)}`);
console.log(`js map : for loop map : ${JSON.stringify(a) === JSON.stringify(e)}`);
console.log(`js map : while loop map2 : ${JSON.stringify(a) === JSON.stringify(f)}`);

describe('Map', () => {
    bench(
        'native js map',
        () => {
            objectList.map((obj) => {
                return obj.id.value;
            });
        },
        mapBenchOption,
    );

    bench(
        'native while map',
        () => {
            nativeWhileMap(objectList, (obj) => {
                return obj.id.value;
            });
        },
        mapBenchOption,
    );

    bench(
        'native while map1',
        () => {
            nativeWhileMap1(objectList, (obj) => {
                return obj.id.value;
            });
        },
        mapBenchOption,
    );

    bench(
        'native for map',
        () => {
            nativeForMap(objectList, (obj) => {
                return obj.id.value;
            });
        },
        mapBenchOption,
    );

    bench(
        'remeda map',
        () => {
            remedaMap(objectList, (obj) => {
                return obj.id.value;
            });
        },
        mapBenchOption,
    );

    bench(
        'lodash map',
        () => {
            lodashMap(objectList, (obj) => {
                return obj.id.value;
            });
        },
        mapBenchOption,
    );
});
