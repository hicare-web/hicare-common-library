import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { reduce as remedaReduce } from 'remeda';
import { reduce as lodashReduce, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

describe('Reduce', () => {
    bench(
        'native js reduce',
        () => {
            objectList.reduce((acc, obj) => {
                return acc + obj.id.value;
            }, 0);
        },
        mapBenchOption,
    );
    bench('remeda reduce', () => {
        remedaReduce(
            objectList,
            (acc, obj) => {
                return acc + obj.id.value;
            },
            0,
        );
    });

    bench('lodash reduce', () => {
        lodashReduce(
            objectList,
            (acc, obj) => {
                return acc + obj.id.value;
            },
            0,
        );
    });
});

const javascriptReduceObjectListCopy = [...objectList];
const remedaReduceObjectListCopy = [...objectList];
const lodashReduceObjectListCopy = [...objectList];

const javascriptReduceList = javascriptReduceObjectListCopy.reduce((acc, obj) => {
    return acc + obj.id.value;
}, 0);
const remedaReduceList = remedaReduce(
    remedaReduceObjectListCopy,
    (acc, obj) => {
        return acc + obj.id.value;
    },
    0,
);
const lodashReduceList = lodashReduce(
    lodashReduceObjectListCopy,
    (acc, obj) => {
        return acc + obj.id.value;
    },
    0,
);

console.log(isEqual(javascriptReduceList, remedaReduceList));
console.log(isEqual(javascriptReduceList, lodashReduceList));
