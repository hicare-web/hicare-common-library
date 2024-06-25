import { isIncludedIn } from 'lib/utility/isIncludedIn';
import { describe, expect, it } from 'vitest';

describe('isIncludedIn', () => {
    it('배열 안에 찾는 값이 있으면 true', () => {
        expect(isIncludedIn(2, [1, 2, 3])).toBe(true);
        expect(isIncludedIn('b', ['a', 'b', 'c'])).toBe(true);
    });

    it('배열 안에 찾는 값이 없으면 false', () => {
        expect(isIncludedIn(4, [1, 2, 3])).toBe(false);
    });
});
