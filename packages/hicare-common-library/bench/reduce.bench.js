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

function nativeWhileReduce(list, callback, initialValue) {
    const length = list.length;
    let i = 0;
    let acc = initialValue;

    while (i < length) {
        acc = callback(acc, list[i], i, list);
        i++;
    }

    return acc;
}

function nativeForReduce(list, callback, initialValue) {
    const length = list.length;
    let i = 0;
    let acc = initialValue;

    for (i = 0; i < length; i++) {
        acc = callback(acc, list[i], i, list);
    }

    return acc;
}

function nativeForReduce1(list, callback, initialValue) {
    const length = list.length;
    let acc = initialValue;

    for (let i = 0; i < length; i++) {
        acc = callback(acc, list[i], i, list);
    }

    return acc;
}

const a = objectList.reduce((acc, obj) => { // WIN!!
    return acc + obj.id.value;
}, 0);
const b = nativeWhileReduce(objectList, (acc, obj) => {
    return acc + obj.id.value;
});
const c = remedaReduce(
    objectList,
    (acc, obj) => {
        return acc + obj.id.value;
    },
    0,
);
const d = lodashReduce(
    objectList,
    (acc, obj) => {
        return acc + obj.id.value;
    },
    0,
);
const e = nativeForReduce(
    objectList,
    (acc, obj) => {
        return acc + obj.id.value;
    },
    0,
);
const f = nativeForReduce1(
    objectList,
    (acc, obj) => {
        return acc + obj.id.value;
    },
    0,
);

console.log(`js reduce : native reduce : ${isEqual(a, b)}`);
console.log(`js reduce : remeda reduce : ${isEqual(a, c)}`);
console.log(`js reduce : lodash reduce : ${isEqual(a, d)}`);
console.log(`js reduce : for loop reduce : ${isEqual(a, e)}`);
console.log(`js reduce : for loop reduce1 : ${isEqual(a, f)}`);

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

    bench(
        'native while reduce',
        () => {
            nativeWhileReduce(
                objectList,
                (acc, obj) => {
                    return acc + obj.id.value;
                },
                0,
            );
        },
        mapBenchOption,
    );

    bench(
        'native for reduce',
        () => {
            nativeForReduce(
                objectList,
                (acc, obj) => {
                    return acc + obj.id.value;
                },
                0,
            );
        },
        mapBenchOption,
    );

    bench(
        'native for reduce1',
        () => {
            nativeForReduce1(
                objectList,
                (acc, obj) => {
                    return acc + obj.id.value;
                },
                0,
            );
        },
        mapBenchOption,
    );

    bench(
        'remeda reduce',
        () => {
            remedaReduce(
                objectList,
                (acc, obj) => {
                    return acc + obj.id.value;
                },
                0,
            );
        },
        mapBenchOption,
    );

    bench(
        'lodash reduce',
        () => {
            lodashReduce(
                objectList,
                (acc, obj) => {
                    return acc + obj.id.value;
                },
                0,
            );
        },
        mapBenchOption,
    );
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
