import { isError } from 'lib/utility/isError';
import { describe, expect, it } from 'vitest';

describe('isError', () => {
    it('Error 인스턴스에 대해 true를 반환', () => {
        expect(isError(new Error('Test error'))).toBe(true);
    });

    it('Error의 서브클래스에 대해 true를 반환', () => {
        class CustomError extends Error {}
        expect(isError(new CustomError('Custom error'))).toBe(true);
    });

    it('Error 인스턴스가 아니면 false를 반환', () => {
        expect(isError('string')).toBe(false);
        expect(isError(123)).toBe(false);
        expect(isError({})).toBe(false);
        expect(isError([])).toBe(false);
        expect(isError(null)).toBe(false);
        expect(isError(undefined)).toBe(false);
    });

    it('Error처럼 보이지만 Error 인스턴스가 아닌 객체에 대해 false를 반환', () => {
        const fakeError = { message: 'Fake error', name: 'Error' };
        expect(isError(fakeError)).toBe(false);
    });
});
