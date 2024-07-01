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

    // 주어진 인자로 함수 호출하고 호출 시간과 호출결과 저장
    function invokeFunc(args: Parameters<F>): ReturnType<F> {
        lastCallTime = Date.now();
        lastArgs = null;
        result = func(...args);
        return result as ReturnType<F>;
    }

    // 타이머가 완료된 후 호출 - 마지막 인자가 있으면 함수 호출
    function trailingEdge(time: number) {
        timeoutId = null;

        if (lastArgs) {
            return invokeFunc(lastArgs);
        }
    }

    // 현재 시간 기준으로 남은 시간 계산
    function remainingWait(time: number) {
        const timeSinceLastCall = time - (lastCallTime ?? 0); // 마지막 호출 이후 경과시간
        const remainingWaitMs = waitMs - timeSinceLastCall; // 대기시간(waitMs) - 경과시간 = 남은 대기시간
        return maxWaitMs ? Math.min(remainingWaitMs, maxWaitMs - timeSinceLastCall) : remainingWaitMs;
        //maxWaitMs가 있으면 ( maxWaitMs - 경과한 시간 )과 남은 대기시간 중 더 작은 값 반환
        // maxWaitMs가 없으면 남은 대기시간 반환
    }

    function debounced(...args: Parameters<F>): ReturnType<F> | undefined {
        const time = Date.now();
        const isInvoking = shouldInvoke(time); // 함수를 호출해야 하는지 확인

        lastArgs = args;
        lastCallTime = time; // 마지막 호출시간을 현재시간으로

        if (isInvoking) {
            if (timeoutId === null && (timing === 'leading' || timing === 'trailing')) {
                result = invokeFunc(lastArgs);
            }
            if (maxWaitMs) {
                maxTimeoutId = setTimeout(timerExpired, maxWaitMs); // maxWaitMs를 넘지 않도록 타이머 설정
            }
        }

        if (timeoutId === null) {
            timeoutId = setTimeout(timerExpired, waitMs);
        }

        return result;
    }

    // 지연된 함수 호출 취소
    function cancel() {
        if (timeoutId) {
            clearTimeout(timeoutId); // 설정된 타이머가 있으면 취소
        }
        if (maxTimeoutId) {
            clearTimeout(maxTimeoutId); // 설정된 최대대기시간이 있으면 취소
        }
        // 모든 관련상태 초기화
        lastCallTime = null;
        timeoutId = null;
        maxTimeoutId = null;
        lastArgs = null;
    }

    // 지연된 함수 즉시 실행
    function flush(): ReturnType<F> | undefined {
        return timeoutId ? trailingEdge(Date.now()) : result;
        // 타이머가 설정되어 있으면 현재시간으로 즉시 함수실행하고 그 결과 반환 / 타이머가 없으면 이미 실행된 이전 값 반환
    }

    // time을 기준으로 함수를 호출해야 하는지 확인
    function shouldInvoke(time: number): boolean {
        const timeSinceLastCall = lastCallTime === null ? 0 : time - lastCallTime;
        return (
            lastCallTime === null || // 처음 함수가 호출됐을 때 - 즉시 함수 호출 필요
            timeSinceLastCall >= waitMs || // waitMs 이후에 호출됐을 때 - 마지막 호출 이후 waitMs 이상 지났을 때 함수 호출 필요
            (maxWaitMs !== undefined && timeSinceLastCall >= maxWaitMs) // 최대 대기시간을 초과했을 때 - maxWaitMs가 있고 마지막 호출 이후 maxWaitMs 이상 경과했을 때 함수 호출 필요
        );
    }

    // 타이머가 만료되었을 때 호출되는 함수
    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            // 현재 시각이 함수를 호출해야 하는 시간인지 확인
            return trailingEdge(time); // 맞으면 함수 호출
        }
        timeoutId = setTimeout(timerExpired, remainingWait(time)); // 아니면 남은 시간만큼 다시 타이머 설정
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
