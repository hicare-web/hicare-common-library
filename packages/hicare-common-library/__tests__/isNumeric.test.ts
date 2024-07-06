import { isNumeric } from 'lib/guard/isNumeric';
import { describe, expect, it } from 'vitest';

describe('isNumeric', () => {
    it('숫자형태의 문자열은 true 반환', () => {
        expect(isNumeric('1,234.56')).toBe(true);
        expect(isNumeric('1e-10')).toBe(true);
        expect(isNumeric('-1.23e-10')).toBe(true);
        expect(isNumeric('1,234,567')).toBe(true);
        expect(isNumeric('1.234e+10')).toBe(true);
    });

    it('BigInt에 대해서 true 반환', () => {
        expect(isNumeric(9007199254740_991)).toBe(true);
        expect(isNumeric('0x1fffffffffffff')).toBe(true);
        expect(isNumeric('0b11111111111111111111111111111111111111111111111111111')).toBe(true);
    });
    it('숫자가 아닌 값은 false 반환', () => {
        expect(isNumeric('not a number')).toBe(false);
        expect(isNumeric('1,23,456')).toBe(false);
        expect(isNumeric('1.2.3')).toBe(false);
    });
});
