import { describe, it, expect } from 'vitest';
import { cloneDeep } from '../lib/utility/cloneDeep';
import { generatorRandomObject } from '../bench/internal/createObject';
import { isEqual } from 'lodash-es';

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
});
