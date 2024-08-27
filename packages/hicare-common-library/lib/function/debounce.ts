export interface DebounceOptions {
    /**
     * 디바운스의 시작 시 함수를 즉시 호출할지 여부를 결정합니다.
     * true로 설정하면 디바운스 타이머가 시작될 때 함수가 즉시 호출됩니다.
     */
    leading?: boolean;

    /**
     * 디바운스의 끝에서 함수를 호출할지 여부를 결정합니다.
     * true로 설정하면 디바운스 타이머가 완료된 후 함수가 호출됩니다.
     */
    trailing?: boolean;

    /**
     * 함수 호출 사이의 최대 대기 시간(밀리초)을 설정합니다.
     * 이 시간이 지나면 maxWait에 도달하여 강제로 함수가 실행됩니다.
     */
    maxWait?: number;
}

/**
 * 주어진 함수를 디바운스하여 마지막 호출 후 지정된 시간이 지난 뒤에만 실행되도록 합니다.
 *
 * @param func - 디바운스할 함수
 * @param wait - 대기 시간 (밀리초)
 * @param options - 디바운스 옵션
 * @returns 디바운스된 함수와 취소 함수
 * @signature
 *  debounce<T extends (...args: any[]) => any>(
 *    func: T,
 *    wait: number,
 *    options?: DebounceOptions
 *  ): [(...args: Parameters<T>) => void, () => void]
 * @example
 *  const [debouncedSearch, cancelSearch] = debounce((query: string) => {
 *    console.log(`Searching for: ${query}`);
 *  }, 300, { leading: true, trailing: true, maxWait: 1000 });
 *
 *  // 첫 번째 호출은 즉시 실행되고, 이후 호출은 300ms 후에 실행됩니다.
 *  debouncedSearch('a');
 *  debouncedSearch('ap');
 *  debouncedSearch('app');
 *  debouncedSearch('appl');
 *  debouncedSearch('apple');
 *
 *  // 디바운스 취소
 *  cancelSearch();
 * @category Function - Control
 */
export function debounceWithCancle<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options: DebounceOptions = {},
): [(...args: Parameters<T>) => void, () => void] {
    let lastArgs: Parameters<T> | null = null;
    let lastThis: any = null;
    let maxWait: number | null = null;
    let result: ReturnType<T>;
    let timerId: number | null = null;
    let lastCallTime: number | null = null;

    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true;

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }

    wait = +wait || 0;
    if (options) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(+(options.maxWait as number) || 0, wait) : null;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time: number): ReturnType<T> {
        const args = lastArgs!;
        const thisArg = lastThis;

        lastArgs = lastThis = null;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function startTimer(pendingFunc: () => void, waitTime: number): number {
        return setTimeout(pendingFunc, waitTime) as unknown as number;
    }

    function cancelTimer(id: number): void {
        clearTimeout(id);
    }

    function leadingEdge(time: number): ReturnType<T> {
        lastInvokeTime = time;
        timerId = startTimer(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time: number): number {
        const timeSinceLastCall = time - (lastCallTime as number);
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = wait - timeSinceLastCall;

        return maxing ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke) : timeWaiting;
    }

    function shouldInvoke(time: number): boolean {
        const timeSinceLastCall = time - (lastCallTime as number);
        const timeSinceLastInvoke = time - lastInvokeTime;

        return (
            lastCallTime === null ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= (maxWait as number))
        );
    }

    function timerExpired(): void {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = startTimer(timerExpired, remainingWait(time));
    }

    function trailingEdge(time: number): ReturnType<T> {
        timerId = null;

        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = null;
        return result;
    }

    function cancel(): void {
        if (timerId !== null) {
            cancelTimer(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = null;
    }

    function flush(): ReturnType<T> {
        return timerId === null ? result : trailingEdge(Date.now());
    }

    function debounced(this: any, ...args: Parameters<T>): void {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === null) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === null) {
            timerId = startTimer(timerExpired, wait);
        }
    }

    debounced.cancel = cancel;
    debounced.flush = flush;

    return [debounced, cancel];
}

/**
 * 주어진 함수를 디바운스하여 마지막 호출 후 지정된 시간이 지난 뒤에만 실행되도록 합니다.
 *
 * @param func - 디바운스할 함수
 * @param wait - 대기 시간 (밀리초)
 * @param options - 디바운스 옵션
 * @returns 디바운스된 함수
 * @signature
 *  debounce<T extends (...args: any[]) => any>(
 *    func: T,
 *    wait: number,
 *    options?: DebounceOptions
 *  ): [(...args: Parameters<T>) => void, () => void]
 * @example
 *  const debouncedSearch = debounce((query: string) => {
 *    console.log(`Searching for: ${query}`);
 *  }, 300, { leading: true, trailing: true, maxWait: 1000 });
 *
 *  // 첫 번째 호출은 즉시 실행되고, 이후 호출은 300ms 후에 실행됩니다.
 *  debouncedSearch('a');
 *  debouncedSearch('ap');
 *  debouncedSearch('app');
 *  debouncedSearch('appl');
 *  debouncedSearch('apple');
 *
 * @category Function - Control
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options: DebounceOptions = {},
): (...args: Parameters<T>) => void {
    return debounceWithCancle(func, wait, options)[0];
}
