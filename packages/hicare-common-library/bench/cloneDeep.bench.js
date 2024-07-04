import { bench, describe, test, expect } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { clone as remedaClone } from 'remeda';
import { cloneDeep as lodashCloneDeep, isEqual } from 'lodash-es';
import { cloneDeep as cloneDeepJs } from '../lib/utility/cloneDeep';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

describe('CloneDeep', () => {
    bench(
        'native js clone',
        () => {
            Object.assign([], objectList);
        },
        mapBenchOption,
    );

    bench('js JSON', () => {
        objectList.map((obj) => {
            return JSON.parse(JSON.stringify(obj));
        });
    });

    bench('js spread operator', () => {
        objectList.map((obj) => {
            return { ...obj };
        });
    });

    bench('js fromEntries', () => {
        objectList.map((obj) => {
            return Object.fromEntries(Object.entries(obj));
        });
    });

    bench('js Object.create(obj, Object.getOwnProperty(obj))', () => {
        return objectList.map((obj) => {
            return Object.create(obj, Object.getOwnProperty(obj));
        });
    });

    bench(
        'remeda clone',
        () => {
            remedaClone(objectList);
        },
        mapBenchOption,
    );

    bench(
        'lodash cloneDeep',
        () => {
            lodashCloneDeep(objectList);
        },
        mapBenchOption,
    );
});

const javascriptCloneObjectListCopy = [...objectList];
const remedaCloneObjectListCopy = [...objectList];
const lodashCloneObjectListCopy = [...objectList];

const javascriptCloneList = cloneDeepJs(javascriptCloneObjectListCopy);
const remedaCloneList = remedaClone(remedaCloneObjectListCopy);
const lodashCloneList = lodashCloneDeep(lodashCloneObjectListCopy);

console.log(isEqual(javascriptCloneList, remedaCloneList));
console.log(isEqual(javascriptCloneList, lodashCloneList));
