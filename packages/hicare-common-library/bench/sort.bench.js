import { bench, describe } from 'vitest';
import { isEqual } from 'lodash-es';

function quickSort(array, key) {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[Math.floor(array.length / 2)][key];
    const left = [];
    const right = [];
    const middle = [];

    for (const item of array) {
        if (item[key] < pivot) {
            left.push(item);
        } else if (item[key] > pivot) {
            right.push(item);
        } else {
            middle.push(item);
        }
    }

    return [...quickSort(left, key), ...middle, ...quickSort(right, key)];
}

function radixSort(array, key) {
    if (array.length <= 1) {
        return array;
    }

    // 최대 자릿수 찾기
    let maxDigit = 0;
    for (const item of array) {
        const digitCount = item[key].toString().length;
        maxDigit = Math.max(maxDigit, digitCount);
    }

    // 자릿수 기준으로 정렬
    for (let digit = 0; digit < maxDigit; digit++) {
        const buckets = Array.from({ length: 10 }, () => []);

        for (const item of array) {
            const digitValue = Math.floor(item[key] / Math.pow(10, digit)) % 10;
            buckets[digitValue].push(item);
        }

        array = [].concat(...buckets);
    }

    return array;
}
function sortArray(array, sortConfig) {
    return array.sort((a, b) => {
        for (const { key, order } of sortConfig) {
            const keyPath = key.split('.');
            let aValue = a;
            let bValue = b;
            for (const path of keyPath) {
                aValue = aValue[path];
                bValue = bValue[path];
            }

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });
}

const javascriptSortObjectListCopy = [...objectList];
const quickSortObjectListCopy = [...objectList];
const radixSortObjectListCopy = [...objectList];

const javascriptSort = javascriptSortObjectListCopy.sort((a, b) => {
    return a.value - b.value;
});
const quickSortObjectList = quickSort(quickSortObjectListCopy, 'value');
const radixSortList = radixSort(radixSortObjectListCopy, 'value');

console.log(isEqual(javascriptSort, quickSortObjectList));
console.log(isEqual(javascriptSort, radixSortList));
console.log(isEqual(quickSortObjectList, radixSortList));

describe('Sort', () => {
    test('is Equal', () => {
        expect(isEqual(javascriptSort, quickSortObjectList)).toBe(true);
        expect(isEqual(javascriptSort, radixSortList)).toBe(true);
        expect(isEqual(quickSortObjectList, radixSortList)).toBe(true);
    });

    bench(
        'native js sort',
        () => {
            javascriptSortObjectListCopy.sort((a, b) => {
                return a.value - b.value;
            });
        },
        sortBenchOption,
    );

    bench(
        'quick sort',
        () => {
            quickSort(quickSortObjectListCopy, 'value');
        },
        sortBenchOption,
    );

    bench(
        'radix sort',
        () => {
            radixSort(radixSortObjectListCopy, 'value');
        },
        sortBenchOption,
    );
});

