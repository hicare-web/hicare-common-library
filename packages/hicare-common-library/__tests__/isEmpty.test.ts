import { isEmpty } from 'lib/utility/isEmpty';
import { describe, expect, it } from 'vitest';

describe('isEmpty', () => {
    it('빈 값일 경우 true 반환', () => {
        expect(isEmpty(undefined)).toEqual(true);
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty([])).toEqual(true);
        expect(isEmpty({})).toEqual(true);
        expect(isEmpty(null)).toEqual(true);
    });

    it('빈 값이 아닐 경우 false 반환', () => {
        expect(isEmpty('not empty')).toEqual(false);
        expect(isEmpty([1, 2, 3])).toEqual(false);
        expect(isEmpty({ length: 0 })).toEqual(false);
        expect(isEmpty(0)).toEqual(false);
        expect(isEmpty(false)).toEqual(false);
    });
});
