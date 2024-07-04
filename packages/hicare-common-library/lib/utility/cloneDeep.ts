import { cloneNestedArrays } from 'lib/utility/internal/cloneNestedArrays';

/**
 *
 * 받은 값의 깊은복사를 하기 위한 함수
 *
 * @param value - 깊은복사를 할 값
 * @signature cloneDeep(value)
 * @example cloneDeep({foo: 'bar'}) // {foo: 'bar'}
 */

export function cloneDeep<T>(value: T): T {
    // 함수 , null, 기본 타입, weak 처리
    if (
        typeof value !== 'object' ||
        value === null ||
        typeof value === 'function' ||
        value instanceof WeakMap ||
        value instanceof WeakSet
    ) {
        return value;
    }

    // symbol, date, regexp 처리
    if (typeof value === 'symbol') {
        throw new Error('Symbol은 복사할 수 없습니다.');
    }
    if (value instanceof Date) {
        return new Date(value) as T;
    }
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags) as T;
    }
    // 배열 처리
    if (Array.isArray(value)) {
        return Object.assign([], cloneNestedArrays(value)) as T;
    }

    // Map ,Set 처리
    if (value instanceof Map) {
        const clonedMapArray = Array.from(value, ([key, value]) => [cloneDeep(key), cloneDeep(value)]);
        const clonedMap = new Map(clonedMapArray as [any, any][]);
        return clonedMap as T;
    }
    if (value instanceof Set) {
        const clonedSetArray = Array.from(value).map((item) => cloneDeep(item));
        return new Set(clonedSetArray) as T;
    }

    // 일반 객체 처리
    return Object.assign({}, value);
}
