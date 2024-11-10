/**
 * 객체의 속성을 변환하여 새로운 객체를 생성합니다.
 *
 * @param obj - 변환할 객체
 * @param transformer - 각 속성을 변환할 함수
 * @param options - 변환 옵션
 * @returns 변환된 새로운 객체
 *
 * @example
 * const obj = { a: 1, b: { c: 2, d: 3 } };
 *
 * // 모든 숫자를 두 배로 만들기
 * const doubled = transform(obj, (value) => typeof value === 'number' ? value * 2 : value);
 * console.log(doubled); // { a: 2, b: { c: 4, d: 6 } }
 *
 * // 특정 키만 변환하기
 * const result = transform(obj, (value, key) => key === 'a' ? value + 10 : value);
 * console.log(result); // { a: 11, b: { c: 2, d: 3 } }
 *
 * // 깊은 변환 비활성화
 * const shallow = transform(obj, (value) => typeof value === 'number' ? value * 2 : value, { deep: false });
 * console.log(shallow); // { a: 2, b: { c: 2, d: 3 } }
 *
 * @category Object
 */
export function transform<T extends Record<string, any>>(
    obj: T,
    transformer: <K extends keyof T>(value: T[K], key: K, obj: T) => T[K],
    options: { deep?: boolean; seen?: WeakSet<object> } = {
        deep: true,
        seen: new WeakSet(),
    },
): T {
    const result = (Array.isArray(obj) ? [] : {}) as T;

    // 순환 참조 감지
    if (options.seen!.has(obj)) {
        return obj; // 순환 참조 발견 시 원본 반환
    }
    options.seen!.add(obj);

    const keys = Object.keys(obj) as Array<keyof T>;

    for (const key of keys) {
        const value = obj[key];
        if (options.deep && typeof value === 'object' && value !== null) {
            result[key] = transform(value, transformer, options) as any;
        } else {
            result[key] = transformer(value, key, obj);
        }
    }

    return result;
}
