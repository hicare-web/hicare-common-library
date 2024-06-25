import { isArray as _isArray } from 'lib/utility/isArray';
import { describe, expect, test } from 'vitest';

describe('_isArray 함수 테스트', () => {
    test('배열일 때 true 반환', () => {
        expect(_isArray([1, 2, 3])).toBe(true);
        expect(_isArray(['a', 'b', 'c'])).toBe(true);
        expect(_isArray([])).toBe(true);
        expect(_isArray([undefined])).toBe(true);
        expect(_isArray([null])).toBe(true);
    });

    test('배열이 아닐 때 false 반환', () => {
        expect(_isArray('string')).toBe(false);
        expect(_isArray(123)).toBe(false);
        expect(_isArray({ key: 'value' })).toBe(false);
        expect(_isArray(null)).toBe(false);
        expect(_isArray(undefined)).toBe(false);
    });
});
