import { throttle } from 'lib/utility/throttle';
import { describe, expect, it, vi } from 'vitest';

describe('throttle', () => {
    it('함수가 스로틀되어서 제한시간동안 한 번만 호출되는지', () => {
        // 목함수 생성
        const mockFn = vi.fn();

        // 스로틀링 걸기
        const throttledFn = throttle(mockFn, 1000);

        // 스로틀된 목함수 여러 번 호출
        throttledFn();
        throttledFn();
        throttledFn();

        // 한 번만 호출된 게 맞는지 확인
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
