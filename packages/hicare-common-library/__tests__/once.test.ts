import { once } from 'lib/utility/once';
import { describe, expect, test, vi } from 'vitest';

describe('once', () => {
    test('함수는 한 번만 호출되어야 함', () => {
        const mockFn = vi.fn(() => 'result');
        const testFn = once(mockFn);

        // 첫 번째 호출
        expect(testFn()).toBe('result');
        expect(mockFn).toHaveBeenCalledTimes(1);

        // 두 번째 호출
        expect(testFn()).toBeUndefined();
        expect(mockFn).toHaveBeenCalledTimes(1);

        // 호출 횟수 확인
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('후속 호출에서 동일한 결과를 반환해야 함', () => {
        const mockFn = vi.fn(() => 'result');
        const testFn = once(mockFn);

        // 첫 번째 호출
        expect(testFn()).toBe('result');
        expect(mockFn).toHaveBeenCalledTimes(1);

        // 두 번째 호출
        expect(testFn()).toBeUndefined();
        expect(mockFn).toHaveBeenCalledTimes(1);

        // 호출 횟수 확인
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('다양한 타입에 대해 올바르게 작동해야 함', () => {
        const mockFnNumber = vi.fn(() => 42);
        const testFnNumber = once(mockFnNumber);

        // 첫 번째 호출
        expect(testFnNumber()).toBe(42);
        expect(mockFnNumber).toHaveBeenCalledTimes(1);

        // 두 번째 호출
        expect(testFnNumber()).toBeUndefined();
        expect(mockFnNumber).toHaveBeenCalledTimes(1);

        const mockFnString = vi.fn(() => 'hello');
        const testFnString = once(mockFnString);

        // 첫 번째 호출
        expect(testFnString()).toBe('hello');
        expect(mockFnString).toHaveBeenCalledTimes(1);

        // 두 번째 호출
        expect(testFnString()).toBeUndefined();
        expect(mockFnString).toHaveBeenCalledTimes(1);
    });
});
