/**
 *
 * 받은 값의 깊은복사를 하기 위한 함수
 *
 * @param value - 깊은복사를 할 값
 * @signature cloneDeep(value)
 * @example cloneDeep({foo: 'bar'}) // {foo: 'bar'}
 */

export function cloneDeep<T>(value: T, visited = new WeakMap<object, T>()): T {
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

    // 순환 참조 처리 / 무한 재귀 방지
    if (visited.has(value as object)) {
        return visited.get(value as object) as T;
    }

    // symbol, date, regexp 처리
    if (typeof value === 'symbol') {
        return Symbol((value as symbol).description) as T;
    }
    if (value instanceof Date) {
        return new Date(value.getTime()) as T;
    }
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags) as T;
    }
    // 배열 처리
    if (Array.isArray(value)) {
        const clonedArr: T[] = [] as unknown as T[];
        visited.set(value, clonedArr as T);
        return Object.assign(
            clonedArr,
            value.map((item) => cloneDeep(item, visited)),
        ) as T;
    }

    // Map ,Set 처리
    if (value instanceof Map) {
        const clonedMap = new Map() as T & Map<any, any>;
        visited.set(value, clonedMap as T);
        (value as Map<any, any>).forEach((v, k) => clonedMap.set(cloneDeep(k, visited), cloneDeep(v, visited)));
        return clonedMap as T;
    }
    if (value instanceof Set) {
        const clonedSet = new Set() as T & Set<any>;
        visited.set(value, clonedSet as T);
        (value as Set<any>).forEach((v) => clonedSet.add(cloneDeep(v, visited)));
        return clonedSet as T;
    }

    // 일반 객체 처리
    const clonedObj = Object.create(Object.getPrototypeOf(value)) as T & { [key: string]: any };
    visited.set(value as object, clonedObj as T);

    return Object.assign(
        clonedObj,
        ...Object.entries(value as { [key: string]: any }).map(([k, v]) => ({ [k]: cloneDeep(v, visited) })),
    );
}
