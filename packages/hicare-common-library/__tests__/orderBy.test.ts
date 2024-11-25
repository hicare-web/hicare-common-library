import { orderBy } from 'lib/array/orderBy';
import { describe, expect, it } from 'vitest';

describe('orderBy', () => {
    it('array object 배열 정렬 order optional', () => {
        const arr = [
            { name: 'foo', age: 10 },
            { name: 'bar', age: 20 },
            { name: 'baz', age: 15 },
        ];

        const result = orderBy(arr, ['age']);
        expect(result).toEqual([
            { name: 'foo', age: 10 },
            { name: 'baz', age: 15 },
            { name: 'bar', age: 20 },
        ]);
    });

    it('array object 배열 정렬 order desc', () => {
        const arr = [
            { name: 'foo', age: 10 },
            { name: 'bar', age: 20 },
            { name: 'baz', age: 15 },
        ];

        const result = orderBy(arr, ['age'], ['desc']);
        expect(result).toEqual([
            { name: 'bar', age: 20 },
            { name: 'baz', age: 15 },
            { name: 'foo', age: 10 },
        ]);
    });
});
