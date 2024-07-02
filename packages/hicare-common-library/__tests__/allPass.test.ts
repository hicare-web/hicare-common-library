import { allPass } from 'lib/utility/guard/allPass';
import { describe, expect, it } from 'vitest';
import { isNullish } from 'lib/utility/guard/isNullish';
import { isString } from 'lib/utility/guard/isString';
import { isArray } from 'lib/utility/guard/isArray';

describe('allPass', () => {
    const isDivisibleBy3 = (x: number) => {
        return x % 3 === 0;
    };
    const isDivisibleBy4 = (x: number) => x % 4 === 0;
    const fns = [isDivisibleBy3, isDivisibleBy4];
    it('모든 함수에 대해 data가 조건을 만족하면 true 반환', () => {
        expect(allPass(12, fns)).toBe(true);
        expect(allPass(24, [isDivisibleBy4, isDivisibleBy3])).toBe(true);
        expect(allPass(undefined, [isNullish])).toBe(true);
        expect(allPass(null, [isNullish])).toBe(true);
        expect(allPass(null, [isNullish])).toBe(true);
        expect(allPass('', [isString])).toBe(true);
        expect(allPass([1, 2, 3], [isArray])).toBe(true);
        expect(allPass([4, 5], [isArray, isString])).toBe(false);
    });

    it('함수 중 하나라도 조건을 만족시키지 못하면 false 반환', () => {
        expect(allPass(8, fns)).toBe(false);
        expect(allPass(0, [isNullish])).toBe(false);
        expect(allPass(0, [isNullish, isNullish])).toBe(false);
        expect(allPass([1, 2, 3], [isNullish])).toBe(false);
        expect(allPass('', [isNullish])).toBe(false);
    });
});
