import { isNull as _isNull } from 'lib/utility/internal/isNull';
import { describe, expect, it } from 'vitest';

describe('isNull', () => {
    it('should return true if the value is null', () => {
        expect(_isNull(null)).toBe(true);
    });
    it('should return false if the value is not null', () => {
        expect(_isNull(undefined)).toBe(false);
        expect(_isNull(0)).toBe(false);
        expect(_isNull('')).toBe(false);
        expect(_isNull([])).toBe(false);
        expect(_isNull({})).toBe(false);
        expect(_isNull(new Date())).toBe(false);
        expect(_isNull(new Error())).toBe(false);
    });
});
