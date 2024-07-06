import { isEmpty } from 'lib/guard/isEmpty';
import { describe, expect, it } from 'vitest';

describe('isEmpty', () => {
    it('빈 값일 경우 true 반환', () => {
        expect(isEmpty(undefined)).toEqual(true);
        expect(isEmpty(null)).toEqual(true);
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty('  ')).toEqual(true);
        expect(isEmpty([])).toEqual(true);
        expect(isEmpty({})).toEqual(true);
        expect(isEmpty(new Set())).toEqual(true);
        expect(isEmpty(new Map())).toEqual(true);
        expect(isEmpty(NaN)).toEqual(true);
        expect(isEmpty(new Date('Invalid Date'))).toEqual(true);
    });

    it('빈 값이 아닐 경우 false 반환', () => {
        expect(isEmpty('hello')).toEqual(false);
        expect(isEmpty([1, 2, 3])).toEqual(false);
        expect(isEmpty({ a: 1 })).toEqual(false);
        expect(isEmpty(0)).toEqual(false);
        expect(isEmpty(false)).toEqual(false);
    });
});
