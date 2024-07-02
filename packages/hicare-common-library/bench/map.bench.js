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
