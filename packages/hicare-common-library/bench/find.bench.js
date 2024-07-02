import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { find as remedaFind } from 'remeda';
import { find as lodashFind, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

describe('Find', () => {
    bench(
        'native js find',
        () => {
            objectList.find((obj) => {
                return obj.id.value > 5;
            });
        },
        mapBenchOption,
    );

    bench(
        'remeda find',
        () => {
            remedaFind(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        mapBenchOption,
    );

    bench(
        'lodash find',
        () => {
            lodashFind(objectList, (obj) => {
                return obj.id.value > 5;
            });
        },
        mapBenchOption,
    );
});

const javascriptFindObjectListCopy = [...objectList];
const remedaFindObjectListCopy = [...objectList];
const lodashFindObjectListCopy = [...objectList];

const javascriptFindList = javascriptFindObjectListCopy.find((obj) => {
    return obj.id.value > 5;
});

const remedaFindList = remedaFind(remedaFindObjectListCopy, (obj) => {
    return obj.id.value > 5;
});
const lodashFindList = lodashFind(lodashFindObjectListCopy, (obj) => {
    return obj.id.value > 5;
});

console.log(isEqual(javascriptFindList, remedaFindList));
console.log(isEqual(javascriptFindList, lodashFindList));
