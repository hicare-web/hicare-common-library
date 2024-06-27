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

    it('함수가 디바운스되어 delay만큼 지연된 후 실행되는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 500);

        // 함수 호출
        debouncedFn();
        expect(mockFn).not.toBeCalled();

        // 지정된 시간만큼 테스트 타이머 진행시킴
        vi.advanceTimersByTime(499);
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(1);
        expect(mockFn).toBeCalled();
    });

    it('이전 타임아웃이 잘 삭제되고 새 타임아웃 예약하는지', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 500);

        debouncedFn();
        vi.advanceTimersByTime(200);
        debouncedFn();
        vi.advanceTimersByTime(300);

        expect(mockFn).not.toBeCalled();

        debouncedFn();
        vi.advanceTimersByTime(200);
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(300);
        expect(mockFn).toBeCalled();
    });
});
