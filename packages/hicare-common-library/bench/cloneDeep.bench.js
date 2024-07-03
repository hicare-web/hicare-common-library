import { bench, describe } from 'vitest';
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

const javascriptCloneList = javascriptCloneObjectListCopy.map((obj) => {
    return structuredClone(obj);
});
const remedaCloneList = remedaClone(remedaCloneObjectListCopy);
const lodashCloneList = lodashCloneDeep(lodashCloneObjectListCopy);

console.log(isEqual(javascriptCloneList, remedaCloneList));
console.log(isEqual(javascriptCloneList, lodashCloneList));
