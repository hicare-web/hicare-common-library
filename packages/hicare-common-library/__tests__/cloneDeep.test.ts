import { isEqual } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { generatorRandomObject } from '../bench/internal/createObject';
import { cloneDeep } from '../lib/utility/cloneDeep';

/** 일반적인 100개의 객체 생성 */
const objectList = [] as any[];
for (let i = 0; i < 100; i++) {
    objectList.push(generatorRandomObject(10));
}

describe('cloneDeep', () => {
    it('객체에 대해 깊은 복사되었는지', () => {
        const obj = { foo: 'bar', nested: { baz: 'qux' } };
        const clonedObj = cloneDeep(obj);

        expect(clonedObj).toStrictEqual(obj);
        expect(clonedObj).not.toBe(obj);
        expect(clonedObj.nested).toStrictEqual(obj.nested);
        expect(isEqual(clonedObj.nested, obj.nested)).not.toEqual(false);
    });

    it('배열에 대해 깊은 복사되었는지', () => {
        const arr = [1, 2, [3, 4]];
        const clonedArr = cloneDeep(arr);

        expect(clonedArr).toEqual(arr);
        expect(clonedArr).not.toBe(arr);
        expect(clonedArr[2]).toEqual(arr[2]);
        expect(clonedArr[2]).not.toBe(arr[2]);
    });

    it('map에 대해 깊은 복사되었는지', () => {
        const map = new Map();
        map.set('key1', 'value1');
        map.set('key2', 'value2');

        const clonedMap = cloneDeep(map);

        expect(clonedMap).toEqual(map);
        expect(clonedMap).not.toBe(map);
        expect(clonedMap.get('key1')).toBe(map.get('key1'));
        expect(clonedMap.get('key2')).toBe(map.get('key2'));
    });

    it('set에 대해 깊은 복사되었는지', () => {
        const set = new Set();
        set.add('value1');
        set.add('value2');

        const clonedSet = cloneDeep(set);

        expect(clonedSet).toEqual(set);
        expect(clonedSet).not.toBe(set);
        expect(clonedSet.has('value1')).toBe(set.has('value1'));
        expect(clonedSet.has('value2')).toBe(set.has('value2'));
    });

    it('Date에 대해 깊은 복사되었는지', () => {
        const date = new Date();
        const clonedDate = cloneDeep(date);

        expect(clonedDate).toEqual(date);
        expect(clonedDate).not.toBe(date);
    });

    it('RegExp에 대해 깊은 복사되었는지', () => {
        const regExp = /test/;
        const clonedRegExp = cloneDeep(regExp);
        expect(clonedRegExp).toEqual(regExp);
        expect(clonedRegExp).not.toBe(regExp);
    });

    /* lodash test */
    it('`_.cloneDeep` should deep clone objects with circular references', () => {
        const object = {
            foo: { b: { c: { d: {} } } },
            bar: { b: {} },
        };

        object.foo.b.c.d = object;
        object.bar.b = object.foo.b;

        const actual = cloneDeep(object);
        expect(actual).toEqual(object);
    });

    it('`_.cloneDeep` should deep clone objects with lots of circular references', () => {
        const object = {
            foo: { b: { c: { d: {} } } },
            bar: { b: {} },
        };

        object.foo.b.c.d = object;
        object.bar.b = object.foo.b;

        const actual = cloneDeep(object);
        expect(object).toStrictEqual(actual);
    });

    it('should clone primitive values', () => {
        expect(cloneDeep('hello')).toBe('hello');
        expect(cloneDeep(42)).toBe(42);
        expect(cloneDeep(true)).toBe(true);
        expect(cloneDeep(null)).toBe(null);
        expect(cloneDeep(undefined)).toBe(undefined);
    });

    it('should clone Date objects', () => {
        const date = new Date('2024-01-01');
        const clonedDate = cloneDeep(date);

        expect(clonedDate).toEqual(date);
        expect(clonedDate).not.toBe(date); // Should be a different instance
    });

    it('should clone arrays', () => {
        const array = [1, 'two', { three: 3 }];
        const clonedArray = cloneDeep(array);

        expect(clonedArray).toEqual(array);
        expect(clonedArray).not.toBe(array);
        expect(clonedArray[2]).not.toBe(array[2]); // Nested objects should be cloned
    });

    it('should clone nested objects', () => {
        const obj = {
            a: 1,
            b: {
                c: 'hello',
                d: {
                    e: true,
                    f: [1, 2, { g: 3 }],
                },
            },
        };

        const clonedObj = cloneDeep(obj);

        expect(clonedObj).toEqual(obj);
        expect(clonedObj).not.toBe(obj);
        expect(clonedObj.b).not.toBe(obj.b);
        expect(clonedObj.b.d).not.toBe(obj.b.d);
        expect(clonedObj.b.d.f).not.toBe(obj.b.d.f);
        expect(clonedObj.b.d.f[2]).not.toBe(obj.b.d.f[2]);
    });

    it('should clone complex nested structures', () => {
        const complex = {
            date: new Date('2024-01-01'),
            numbers: [1, 2, 3],
            nested: {
                string: 'hello',
                array: [{ a: 1 }, { b: 2 }],
                deepNested: {
                    boolean: true,
                    date: new Date('2024-12-31'),
                },
            },
        };

        const clonedComplex = cloneDeep(complex);

        expect(clonedComplex).toEqual(complex);
        expect(clonedComplex).not.toBe(complex);
        expect(clonedComplex.date).not.toBe(complex.date);
        expect(clonedComplex.numbers).not.toBe(complex.numbers);
        expect(clonedComplex.nested).not.toBe(complex.nested);
        expect(clonedComplex.nested.array).not.toBe(complex.nested.array);
        expect(clonedComplex.nested.array[0]).not.toBe(complex.nested.array[0]);
        expect(clonedComplex.nested.deepNested).not.toBe(complex.nested.deepNested);
        expect(clonedComplex.nested.deepNested.date).not.toBe(complex.nested.deepNested.date);
    });
});
