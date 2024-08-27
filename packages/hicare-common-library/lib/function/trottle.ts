export interface ThrottleOptions {
    /**
     * 스로틀의 시작 시 함수를 즉시 호출할지 여부를 결정합니다.
     * true로 설정하면 스로틀 타이머가 시작될 때 함수가 즉시 호출됩니다.
     */
    leading?: boolean;

    /**
     * 스로틀의 끝에서 함수를 호출할지 여부를 결정합니다.
     * true로 설정하면 스로틀 타이머가 완료된 후 함수가 호출됩니다.
     */
    trailing?: boolean;
}

/**
 * 주어진 함수를 스로틀링하여 지정된 시간 간격 동안 최대 한 번만 실행되도록 합니다.
 *
 * @param func - 스로틀링할 함수
 * @param wait - 시간 간격 (밀리초)
 * @param options - 스로틀 옵션
 * @returns 스로틀된 함수와 취소 함수
 * @signature
 *  throttle<T extends (...args: any[]) => any>(
 *    func: T,
 *    wait: number,
 *    options?: ThrottleOptions
 *  ): [(...args: Parameters<T>) => ReturnType<T> | undefined, () => void]
 * @example
 *  const [throttledScroll, cancelScroll] = throttle(() => {
 *    console.log('Scroll event');
 *  }, 1000, { leading: true, trailing: true });
 *
 *  // 스크롤 이벤트에 연결
 *  window.addEventListener('scroll', throttledScroll);
 *
 *  // 스로틀 취소
 *  cancelScroll();
 * @category Function - Control
 */
export function throttleWithCancle<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options: ThrottleOptions = {},
): [(...args: Parameters<T>) => ReturnType<T> | undefined, () => void] {
    let lastArgs: Parameters<T> | null = null;
    let lastThis: any = null;
    let result: ReturnType<T>;
    let timerId: number | null = null;
    let lastCallTime: number | undefined;

    let leading = true;
    let trailing = true;

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }

    wait = +wait || 0;
    if (options) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time: number): ReturnType<T> {
        const args = lastArgs!;
        const thisArg = lastThis;

        lastArgs = lastThis = null;
        lastCallTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function startTimer(pendingFunc: () => void, wait: number): number {
        return setTimeout(pendingFunc, wait) as unknown as number;
    }

    function cancelTimer(id: number): void {
        clearTimeout(id);
    }

    function leadingEdge(time: number): ReturnType<T> | undefined {
        lastCallTime = time;
        timerId = startTimer(timerExpired, wait);
        return leading ? invokeFunc(time) : undefined;
    }

    function remainingWait(time: number): number {
        const timeSinceLastCall = time - (lastCallTime as number);
        return wait - timeSinceLastCall;
    }

    function shouldInvoke(time: number): boolean {
        return lastCallTime === undefined || time - lastCallTime >= wait;
    }

    function timerExpired(): void {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = startTimer(timerExpired, remainingWait(time));
    }

    function trailingEdge(time: number): ReturnType<T> | undefined {
        timerId = null;

        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = null;
        return undefined;
    }

    function cancel(): void {
        if (timerId !== null) {
            cancelTimer(timerId);
        }
        lastCallTime = undefined;
        lastArgs = lastThis = timerId = null;
    }

    function flush(): ReturnType<T> | undefined {
        return timerId === null ? result : trailingEdge(Date.now());
    }

    function throttled(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        lastThis = this;

        if (isInvoking) {
            if (timerId === null) {
                return leadingEdge(time);
            }
            if (trailing) {
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(time);
            }
        }
        if (timerId === null) {
            timerId = startTimer(timerExpired, wait);
        }
        return result;
    }

    throttled.cancel = cancel;
    throttled.flush = flush;

    return [throttled, cancel];
}

/**
 * 주어진 함수를 스로틀링하여 지정된 시간 간격 동안 최대 한 번만 실행되도록 합니다.
 *
 * @param func - 스로틀링할 함수
 * @param wait - 시간 간격 (밀리초)
 * @param options - 스로틀 옵션
 * @returns 스로틀된 함수와 취소 함수
 * @signature
 *  throttle<T extends (...args: any[]) => any>(
 *    func: T,
 *    wait: number,
 *    options?: ThrottleOptions
 *  ): [(...args: Parameters<T>) => ReturnType<T> | undefined, () => void]
 * @example
 *  const [throttledScroll, cancelScroll] = throttle(() => {
 *    console.log('Scroll event');
 *  }, 1000, { leading: true, trailing: true });
 *
 *  // 스크롤 이벤트에 연결
 *  window.addEventListener('scroll', throttledScroll);
 *
 *  // 스로틀 취소
 *  cancelScroll();
 * @category Function - Control
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options: ThrottleOptions = {},
): (...args: Parameters<T>) => ReturnType<T> | undefined {
    return throttleWithCancle(func, wait, options)[0];
}
