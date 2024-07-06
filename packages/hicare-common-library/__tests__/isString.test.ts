import { isString } from 'lib/guard/isString';
import { describe, expect, it } from 'vitest';

describe('isString', () => {
    it('문자열일 경우 true 반환', () => {
        expect(isString('string')).toEqual(true);
        expect(isString('')).toEqual(true);
    });

    it('문자열이 아닐 경우 false 반환', () => {
        expect(isString(1)).toEqual(false);
        expect(isString(null)).toEqual(false);
        expect(isString(undefined)).toEqual(false);
        expect(isString({})).toEqual(false);
        expect(isString([])).toEqual(false);
        expect(isString(new Date())).toEqual(false);
        expect(isString(new Error())).toEqual(false);
        expect(isString(() => {})).toEqual(false);
    });
});
