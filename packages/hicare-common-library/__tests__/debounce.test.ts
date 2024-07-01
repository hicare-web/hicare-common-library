import { debounce } from 'lib/utility/debounce';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

describe('debounce', () => {
    beforeEach(() => {
        // setTimeout의 동작을 대체
        vi.useFakeTimers();
    });

    afterEach(() => {
        // 타이머를 실제 시간으로 되돌림
        vi.useRealTimers();
    });

    it('trailing timing으로 함수가 디바운스되어 waitMs만큼 지연된 후 실행되는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, { waitMs: 500 });

        debouncedFn.call();
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(499);
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(1);
        expect(mockFn).toBeCalled();
    });

    it('이전 타임아웃이 잘 삭제되고 새 타임아웃 예약하는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, { waitMs: 500 });

        debouncedFn.call();
        vi.advanceTimersByTime(200);
        debouncedFn.call();
        vi.advanceTimersByTime(300);

        expect(mockFn).not.toBeCalled();

        debouncedFn.call();
        vi.advanceTimersByTime(200);
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(300);
        expect(mockFn).toBeCalled();
    });

    it('leading timing으로 즉시 실행되는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, { waitMs: 500, timing: 'leading' });

        debouncedFn.call();
        expect(mockFn).toBeCalled();

        vi.advanceTimersByTime(500);
        expect(mockFn).toBeCalledTimes(1);
    });

    it('maxWaitMs 옵션이 작동하는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, { waitMs: 500, maxWaitMs: 1000 });

        debouncedFn.call();
        vi.advanceTimersByTime(400);
        vi.advanceTimersByTime(400);
        vi.advanceTimersByTime(400);

        expect(mockFn).toBeCalledTimes(1); // maxWaitMs을 넘어서 한 번 호출됨
    });

    it('cancel 메서드가 대기 중인 실행을 취소하는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, { waitMs: 500 });

        debouncedFn.call();
        debouncedFn.cancel();

        vi.advanceTimersByTime(500);
        expect(mockFn).not.toBeCalled();
    });

    it('flush 메서드가 대기 중인 실행을 즉시 수행하는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, { waitMs: 500 });

        debouncedFn.call();
        debouncedFn.flush();

        expect(mockFn).toBeCalled();
    });

    it('isPending 속성이 대기 중인 실행을 올바르게 나타내는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, { waitMs: 500 });

        expect(debouncedFn.isPending).toBe(false);

        debouncedFn.call();
        expect(debouncedFn.isPending).toBe(true);

        vi.advanceTimersByTime(500);
        expect(debouncedFn.isPending).toBe(false);
    });

    it('cachedValue 속성이 마지막 실행 결과를 올바르게 저장하는지', () => {
        const mockFn = vi.fn().mockReturnValue(42);
        const debouncedFn = debounce(mockFn, { waitMs: 500 });

        debouncedFn.call();
        vi.advanceTimersByTime(500);
        expect(debouncedFn.cachedValue).toBe(42);
    });
});
