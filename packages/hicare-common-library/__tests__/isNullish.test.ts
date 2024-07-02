import { isNullish as _isNullish } from 'lib/utility/guard/isNullish';
import { describe, expect, it } from 'vitest';

describe('isNull', () => {
    it('should return true if the value is null or undefined', () => {
        expect(_isNullish(null)).toBe(true);
        expect(_isNullish(undefined)).toBe(true);
    });
    it('should return false if the value is not null | undefined', () => {
        expect(_isNullish(0)).toBe(false);
        expect(_isNullish('')).toBe(false);
        expect(_isNullish([])).toBe(false);
        expect(_isNullish({})).toBe(false);
        expect(_isNullish(new Date())).toBe(false);
        expect(_isNullish(new Error())).toBe(false);
    });
});
