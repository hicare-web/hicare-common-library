import { isIncludeIn } from 'lib/guard/isIncludeIn';
import { describe, expect, it } from 'vitest';

describe('isIncludedIn', () => {
    it('배열 안에 찾는 값이 있으면 true', () => {
        expect(isIncludeIn(2, [1, 2, 3])).toBe(true);
        expect(isIncludeIn('b', ['a', 'b', 'c'])).toBe(true);
    });

    it('배열 안에 찾는 값이 없으면 false', () => {
        expect(isIncludeIn(4, [1, 2, 3])).toBe(false);
    });
});
