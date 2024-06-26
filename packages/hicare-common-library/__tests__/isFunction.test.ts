import { isFunction as _isFunction } from 'lib/utility/isFunction';
import { describe, expect, test } from 'vitest';

describe('_isFunction', () => {
    test('함수 표현식이면 true 반환', () => {
        const funcExpr = function () {};
        expect(_isFunction(funcExpr)).toBe(true);
    });

    test('화살표 함수이면 true 반환', () => {
        const arrowFunc = () => {};
        expect(_isFunction(arrowFunc)).toBe(true);
    });

    test('함수 선언이면 true 반환', () => {
        function declaredFunc() {}
        expect(_isFunction(declaredFunc)).toBe(true);
    });

    test('함수가 아닌 것들에 대해서는 false 반환', () => {
        expect(_isFunction(123)).toBe(false);
        expect(_isFunction({})).toBe(false);
        expect(_isFunction([1, 2, 3])).toBe(false);
        expect(_isFunction(null)).toBe(false);
        expect(_isFunction(undefined)).toBe(false);
    });
});
