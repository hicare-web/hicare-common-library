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

describe('Filter', () => {
    bench(
        'native js filter',
        () => {
            objectList.filter((obj) => {
                return obj.id.value > 5;
            });
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

const javascriptFilterObjectListCopy = [...objectList];
const remedaFilterObjectListCopy = [...objectList];
const lodashFilterObjectListCopy = [...objectList];

const javascriptFilterList = javascriptFilterObjectListCopy.filter((obj) => {
    return obj.id.value > 5;
});
const remedaFilterList = remedaFilter(remedaFilterObjectListCopy, (obj) => {
    return obj.id.value > 5;
});
const lodashFilterList = lodashFilter(lodashFilterObjectListCopy, (obj) => {
    return obj.id.value > 5;
});

console.log(isEqual(javascriptFilterList, remedaFilterList));
console.log(isEqual(javascriptFilterList, lodashFilterList));
