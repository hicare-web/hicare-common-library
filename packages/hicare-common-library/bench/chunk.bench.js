import { bench, describe } from 'vitest';
import { generatorRandomObject } from './internal/createObject';
import { chunkBenchOption } from './option/benchOption';
import { chunk as remedaChunk } from 'remeda';
import { chunk as lodashChunk, isEqual } from 'lodash-es';

/** 일반적인 100개의 객체 생성 */
const objectList = [];
// for (let i = 0; i < 100; i++) {
//     objectList.push(generatorRandomObject(10));
// }


objectList.push(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

function nativeChunk(list, size) {
    const arraySize = list == null ? 0 : list.length;
    if (!arraySize || size < 1) {
        return;
    }

    const result = new Array(Math.ceil(arraySize / size));

    for (let i = 0; i < list.length; i += size) {
        result.push(list.slice(i, i + size));
    }
    return result;
}

function nativeChunkWhile(list, size) {
    size = Math.max(size, 0);

    const arraySize = list == null ? 0 : list.length;
    if (!arraySize || size < 1) {
        return;
    }

    const result = new Array(Math.ceil(arraySize / size));
    let index = 0;
    let resIndex = 0;

    while (index < arraySize) {
        result[resIndex++] = list.slice(index, (index += size));
    }
    return result;
}

function nativeChunkWhile2(list, size) {
    size = Math.max(size, 0);

    const arraySize = list == null ? 0 : list.length;
    if (!arraySize || size < 1) {
        return;
    }

    const result = new Array(Math.ceil(arraySize / size));
    let index = 0;
    let resIndex = 0;

    while (index < arraySize) {
        console.log('index', index, 'resIndex', resIndex, arraySize, size);
        const sliced = list.slice(index, (index += size));
        console.log('index', index, 'resIndex', resIndex, arraySize, size, sliced);
        result[resIndex++] = sliced;
    }
    return result;
}

function slice(array, start, end) {
    let length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    start = start == null ? 0 : start;
    end = end === undefined ? length : end;

    if (start < 0) {
        start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : (end - start) >>> 0;
    start >>>= 0;

    let index = -1;
    const result = new Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}

function chunk(array, size = 1) {
    size = Math.max(+size, 0);
    const length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    let index = 0;
    let resIndex = 0;
    const result = new Array(Math.ceil(length / size));

    while (index < length) {
        result[resIndex++] = slice(array, index, (index += size));
    }
    return result;
}

describe('Chunk', () => {
    bench(
        'native js chunk',
        () => {
            nativeChunk(objectList, 3);
        },
        chunkBenchOption,
    );

    bench(
        'native js chunk while',
        () => {
            nativeChunkWhile(objectList, 3);
        },
        chunkBenchOption,
    );

    bench(
        'js chunk',
        () => {
            chunk(objectList, 3);
        },
        chunkBenchOption,
    );


    bench(
        'remeda chunk',
        () => {
            remedaChunk(objectList, 3);
        },
        chunkBenchOption,
    );

    bench(
        'lodash chunk',
        () => {
            lodashChunk(objectList, 3);
        },
        chunkBenchOption,
    );
});
