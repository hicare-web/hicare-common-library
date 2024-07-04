import { describe, it, expect } from 'vitest';
import { cloneDeep } from '../lib/utility/cloneDeep';

describe('cloneDeep', () => {
    it('객체에 대해 깊은 복사되었는지', () => {
        const obj = { foo: 'bar', nested: { baz: 'qux' } };
        const clonedObj = cloneDeep(obj);

        expect(clonedObj).toEqual(obj);
        expect(clonedObj).not.toBe(obj);
        expect(clonedObj.nested).toEqual(obj.nested);
        expect(clonedObj.nested).not.toBe(obj.nested);
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
});
