import { isNumeric, isNumericExponential } from 'lib/utility/isNumeric';
import { describe, expect, it } from 'vitest';

describe('isNumeric', () => {
    it('숫자형태의 문자열은 true 반환', () => {
        expect(isNumeric('789')).toBe(true);
        expect(isNumeric('-10')).toBe(true);
        expect(isNumeric('0.123')).toBe(true);
        expect(isNumeric('3,145')).toBe(true);
        expect(isNumericExponential('2e5')).toBe(true);
        expect(isNumeric('1n')).toBe(true);
    });

    it('BigInt에 대해서 true 반환', () => {
        expect(isNumeric('9007199254740991n')).toBe(true);
        expect(isNumeric('0x1fffffffffffff')).toBe(true);
        expect(isNumeric('0b11111111111111111111111111111111111111111111111111111')).toBe(true);
    });

    it('숫자가 아닌 값은 false 반환', () => {
        expect(isNumeric('abc')).toBe(false);
        // expect(isNumeric('12abㄴc')).toBe(false);
        expect(isNumeric('')).toBe(false);
        expect(isNumeric(' ')).toBe(false);
        expect(isNumeric({})).toBe(false);
        expect(isNumeric([])).toBe(false);
        expect(isNumeric(NaN)).toBe(false);
        expect(isNumeric(undefined)).toBe(false);
        expect(isNumeric(null)).toBe(false);
        expect(isNumeric('    42  ')).toBe(false);
    });
});
