import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { mapBenchOption } from './option/benchOption';
import { flat as remedaFlatten } from 'remeda';
import { flatten as lodashFlatten, isEqual } from 'lodash-es';

// /** 일반적인 100개의 객체 생성 */
// const objectList = [];
// for (let i = 0; i < 100; i++) {
//     objectList.push(generatorRandomObject(10));
// }

const nestedArray = [1, [2, 3], 4, [5, [6, 7]]];

function nativeForFlatten(array) {
    const result = [];
    const length = array.length;

    for (let i = 0; i < length; i++) {
        const item = array[i];
        if (Array.isArray(item)) {
            for (let j = 0; j < item.length; j++) {
                result.push(item[j]);
            }
        } else {
            result.push(item);
        }
    }

    return result;
}

function nativeWhileFlatten(array) {// WIN!!
    const result = [];
    const length = array.length;
    let i = 0;

    while (i < length) {
        const item = array[i];
        if (Array.isArray(item)) {
            let j = 0;
            while (j < item.length) {
                result.push(item[j]);
                j++;
            }
        } else {
            result.push(item);
        }
        i++;
    }

    return result;
}

function nativeForFlatten(array, depth = 1) {
    const result = [];
    const stack = array.map((item) => ({ value: item, depth }));

    for (let i = 0; i < stack.length; i++) {
        const { value, depth: currentDepth } = stack[i];

        if (Array.isArray(value) && currentDepth > 0) {
            for (let j = value.length - 1; j >= 0; j--) {
                stack.splice(i + 1, 0, { value: value[j], depth: currentDepth - 1 });
            }
        } else {
            result.push(value);
        }
    }

    return result;
}

function nativeWhileFlatten(array, depth = 1) {
    // WIN!!
    const result = [];
    const stack = array.map((item) => ({ value: item, depth }));

    while (stack.length > 0) {
        const { value, depth: currentDepth } = stack.shift();

        if (Array.isArray(value) && currentDepth > 0) {
            let j = value.length - 1;
            while (j >= 0) {
                stack.unshift({ value: value[j], depth: currentDepth - 1 });
                j--;
            }
        } else {
            result.push(value);
        }
    }

    return result;
}

const a = nestedArray.flat();
const b = nativeForFlatten(nestedArray);
const c = remedaFlatten(nestedArray);
const d = lodashFlatten(nestedArray);
const e = nativeWhileFlatten(nestedArray);

console.log(`js flatten : flat : ${isEqual(a, b)}`);
console.log(`js flatten : remeda flatten : ${isEqual(a, c)}`);
console.log(`js flatten : lodash flatten : ${isEqual(a, d)}`);
console.log(`js flatten : while loop flatten : ${isEqual(a, e)}`);

describe('Flatten', () => {
    bench(
        'native js flatten',
        () => {
            nestedArray.flat();
        },
        mapBenchOption,
    );

    bench(
        'remeda flatten',
        () => {
            remedaFlatten(nestedArray);
        },
        mapBenchOption,
    );

    bench(
        'lodash flatten',
        () => {
            lodashFlatten(nestedArray);
        },
        mapBenchOption,
    );

    bench(
        'while loop flatten',
        () => {
            nativeWhileFlatten(nestedArray);
        },
        mapBenchOption,
    );

    bench(
        'for loop flatten',
        () => {
            nativeForFlatten(nestedArray);
        },
        mapBenchOption,
    );
});
