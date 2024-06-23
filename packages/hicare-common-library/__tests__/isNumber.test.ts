// isNumber.test.ts
import { isNumber } from 'lib/utility/isNumber';
import { describe, expect, test } from 'vitest';

describe('isNumber test', () => {
    test('숫자면 true 반환', () => {
        expect(isNumber(1)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(-123)).toBe(true);
        expect(isNumber(3.14)).toBe(true);
    });

    test('숫자가 아니면 false 반환', () => {
        expect(isNumber('string')).toBe(false);
        expect(isNumber(1n)).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber([])).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(undefined)).toBe(false);
        expect(isNumber(NaN)).toBe(false);
    });
});
