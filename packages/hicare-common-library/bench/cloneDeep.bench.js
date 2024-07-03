import { bench, describe, test, expect } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { clone as remedaClone } from 'remeda';
import { cloneDeep as lodashCloneDeep, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

describe('CloneDeep', () => {
    bench(
        'native js clone',
        () => {
            objectList.map((obj) => {
                return structuredClone(obj);
            });
        },
        mapBenchOption,
    );

    bench('js JSON', () => {
        objectList.map((obj) => {
            return JSON.parse(JSON.stringify(obj));
        });
    });

    bench('js Object.assign', () => {
        objectList.map((obj) => {
            return Object.assign({}, obj);
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

    bench('js Object.create(obj, Object.getOwnPropertyDescriptors(obj))', () => {
        return objectList.map((obj) => {
            return Object.create(obj, Object.getOwnPropertyDescriptors(obj));
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
