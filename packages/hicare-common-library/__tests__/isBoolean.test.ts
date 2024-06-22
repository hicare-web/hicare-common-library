import { isBoolean } from 'lib/utility/isBoolean';
import { describe, expect, test } from 'vitest';

describe('isBoolean 함수 테스트', () => {
    test('boolean 값을 입력했을 때 true 반환', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
    });

    test('boolean 값이 아닐 때 false 반환', () => {
        expect(isBoolean('string')).toBe(false);
        expect(isBoolean(123)).toBe(false);
        expect(isBoolean({})).toBe(false);
        expect(isBoolean([])).toBe(false);
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean(undefined)).toBe(false);
    });
});
