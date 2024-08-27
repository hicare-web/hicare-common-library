export type AnyFunction = (...args: any[]) => any;

/**
 * memoize 함수에 대한 옵션을 정의하는 인터페이스입니다.
 */
export interface MemoizeOptions<T extends AnyFunction> {
    /**
     * 캐시의 최대 크기를 설정합니다.
     * 이 크기를 초과하면 가장 오래된 항목이 제거됩니다.
     * 기본값은 1000입니다.
     */
    maxCacheSize?: number;

    /**
     * 캐시 키를 생성하는 함수입니다.
     * 기본적으로 JSON.stringify를 사용하여 인자를 문자열화합니다.
     *
     * @param args - 원본 함수에 전달된 인자들
     * @returns 캐시 키로 사용될 문자열
     */
    keyGenerator?: (...args: Parameters<T>) => string;
}

/**
 * 함수의 결과를 메모이제이션(캐싱)합니다.
 * 동일한 인자로 함수가 호출될 때 이전에 계산된 결과를 반환합니다.
 * 캐시 크기 제한과 커스텀 키 생성 기능을 제공합니다.
 *
 * @param fn - 메모이제이션할 함수
 * @param options - 메모이제이션 옵션
 * @returns 메모이제이션된 함수와 캐시 초기화 메서드
 * @signature
 *  memoize<T extends AnyFunction>(
 *    fn: T,
 *    options?: MemoizeOptions<T>
 *  ): T & { clearCache: () => void }
 * @example
 *  // 기본 사용
 *  const fibonacci = memoize((n: number): number => {
 *    if (n <= 1) return n;
 *    return fibonacci(n - 1) + fibonacci(n - 2);
 *  });
 *
 *  console.log(fibonacci(100)); // 빠르게 계산됨
 *  console.log(fibonacci(100)); // 캐시된 결과 반환
 *
 *  // 옵션 사용
 *  const greet = memoize(
 *    (firstName: string, lastName: string) => `Hello, ${firstName} ${lastName}!`,
 *    {
 *      maxCacheSize: 100,
 *      keyGenerator: (firstName, lastName) => `${firstName}-${lastName}`
 *    }
 *  );
 *
 *  console.log(greet('John', 'Doe')); // 계산 후 캐시
 *  console.log(greet('John', 'Doe')); // 캐시된 결과 반환
 *
 *  // 캐시 초기화
 *  greet.clearCache();
 * @category Function - Optimization
 */
export function memoize<T extends AnyFunction>(fn: T, options: MemoizeOptions<T> = {}): T & { clearCache: () => void } {
    const { maxCacheSize = 1000, keyGenerator = (...args: Parameters<T>): string => JSON.stringify(args) } = options;

    const cache = new Map<string, ReturnType<T>>();
    const argCache = new WeakMap<object, string>();

    function memoized(this: any, ...args: Parameters<T>): ReturnType<T> {
        let key: string;
        if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
            const cachedKey = argCache.get(args[0]);
            if (cachedKey !== undefined) {
                key = cachedKey;
            } else {
                key = keyGenerator(...args);
                argCache.set(args[0], key);
            }
        } else {
            key = keyGenerator(...args);
        }

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn.apply(this, args);

        if (cache.size >= maxCacheSize) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }

        cache.set(key, result);
        return result;
    }

    memoized.clearCache = () => {
        cache.clear();
        // WeakMap doesn't have a clear method, it will be garbage collected automatically
    };

    return memoized as T & { clearCache: () => void };
}
