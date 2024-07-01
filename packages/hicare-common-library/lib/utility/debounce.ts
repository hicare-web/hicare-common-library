/**
 *
 * func를 정의된 밀리초 동안 함수 호출을 지연시키는 함수
 * 디바운스된 함수가 호출될 때마다 clearTimeout()을 사용하여 현재 보류 중인 시간 제한을 지우고 setTimeout()을 사용하여 최소 ms 밀리초가 경과할 때까지 함수 호출을 지연시키는 새 시간 제한을 만듭니다.
 *
 *
 * @param func // 호출을 지연시킬 함수
 * @param {number} // delay 지연시킬 밀리초 시간
 * @returns // 새로 디바운스 된 함수 반환
 *  default - call : 함수 호출,
 * cancel : 지연된 함수 호출 취소,
 * flush : 지연된 함수 호출 즉시 실행,
 * isPending : 지연된 함수 호출이 보류 중인지 확인,
 * cachedValue : 최신 반환 값
 * @signature debounce(func,option)
 * @example
 *   const debounce = debounce(identity(), { timing: 'trailing', waitMs: 1000 });
 *   const result1 = debounce.call(1); // => undefined
 *   const result2 = debounce.call(2); // => undefined
 *   // 1초 후
 *   const result3 = debounce.call(3); // => 2
 *   // 1초 후
 *   debounce.cachedValue; // => 3
 *
 */

type Debounce<F extends (...args: any) => unknown, IsNullable extends boolean = true> = {
    readonly call: (...args: Parameters<F>) => ReturnType<F> | (true extends IsNullable ? undefined : never);
    readonly cancel: () => void;
    readonly flush: () => ReturnType<F> | undefined;
    readonly isPending: boolean;
    readonly cachedValue: ReturnType<F> | undefined;
};

type DebounceOptions = {
    readonly waitMs?: number;
    readonly maxWaitMs?: number;
};

export function debounce<F extends (...args: any) => any>(
    func: F,
    options: DebounceOptions & { readonly timing?: 'trailing' },
): Debounce<F>;
export function debounce<F extends (...args: any) => any>(
    func: F,
    {
        waitMs = 0,
        timing = 'trailing',
        maxWaitMs,
    }: DebounceOptions & {
        readonly timing?: 'leading' | 'trailing';
    },
): Debounce<F> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let maxTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: Parameters<F> | null = null;
    let result: ReturnType<F> | undefined;
    let lastCallTime: number | null = null;

    function invokeFunc(args: Parameters<F>): ReturnType<F> {
        lastCallTime = Date.now();
        lastArgs = null;
        result = func(...args);
        return result as ReturnType<F>;
    }

    function trailingEdge(time: number) {
        timeoutId = null;

        if (lastArgs) {
            return invokeFunc(lastArgs);
        }
    }

    function remainingWait(time: number) {
        const timeSinceLastCall = time - (lastCallTime ?? 0);
        const remainingWaitMs = waitMs - timeSinceLastCall;
        return maxWaitMs !== undefined ? Math.min(remainingWaitMs, maxWaitMs - timeSinceLastCall) : remainingWaitMs;
    }

    function debounced(...args: Parameters<F>): ReturnType<F> | undefined {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        lastCallTime = time;

        if (isInvoking) {
            if (timeoutId === null && (timing === 'leading' || timing === 'trailing')) {
                result = invokeFunc(lastArgs);
            }
            if (maxWaitMs !== undefined) {
                maxTimeoutId = setTimeout(timerExpired, maxWaitMs);
            }
        }

        if (timeoutId === null) {
            timeoutId = setTimeout(timerExpired, waitMs);
        }

        return result;
    }

    function cancel() {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        if (maxTimeoutId !== null) {
            clearTimeout(maxTimeoutId);
        }
        // lastInvokeTime = 0;
        lastCallTime = null;
        timeoutId = null;
        maxTimeoutId = null;
        lastArgs = null;
    }

    function flush(): ReturnType<F> | undefined {
        return timeoutId === null ? result : trailingEdge(Date.now());
    }

    function shouldInvoke(time: number): boolean {
        const timeSinceLastCall = lastCallTime === null ? 0 : time - lastCallTime;
        return (
            lastCallTime === null ||
            timeSinceLastCall >= waitMs ||
            (maxWaitMs !== undefined && timeSinceLastCall >= maxWaitMs)
        );
    }

    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timeoutId = setTimeout(timerExpired, remainingWait(time));
    }

    return {
        call: debounced,
        cancel,
        flush,
        get isPending() {
            return timeoutId !== null;
        },
        get cachedValue() {
            return result;
        },
    };
}
