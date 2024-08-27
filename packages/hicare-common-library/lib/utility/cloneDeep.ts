import { isPrimitive } from 'lib/guard';

/**
 * 복제 가능한 값의 타입을 정의합니다.
 */
type Cloneable = any;

/**
 * 주어진 값의 깊은 복사본을 생성합니다.
 * 성능 최적화를 위해 low-level JavaScript 기능을 사용합니다.
 *
 * @template T - 복사할 값의 타입
 * @param {T} value - 복사할 값
 * @returns {T} 깊은 복사된 값
 *
 * @example
 * const obj = { a: 1, b: { c: 2 }, d: [3, { e: 4 }] };
 * const cloned = cloneDeep(obj);
 * console.log(cloned); // { a: 1, b: { c: 2 }, d: [3, { e: 4 }] }
 * console.log(cloned !== obj); // true
 * console.log(cloned.b !== obj.b); // true
 * console.log(cloned.d !== obj.d); // true
 *
 * @category Utility - Data Manipulation
 */
export function cloneDeep<T extends Cloneable>(value: T): T {
    return internalCloneDeep(value, new WeakMap());
}

/**
 * 내부 깊은 복사 함수
 * @param {T} value - 복사할 값
 * @param {WeakMap<Cloneable, Cloneable>} cache - 순환 참조 처리를 위한 캐시
 * @returns {T} 깊은 복사된 값
 */
function internalCloneDeep<T extends Cloneable>(value: T, cache: WeakMap<Cloneable, Cloneable>): T {
    if (isPrimitive(value)) return value;
    if (cache.has(value)) return cache.get(value) as T;

    const result = cloneByType(value, cache);
    cache.set(value, result);

    return result as T;
}

/**
 * 타입에 따른 복사 처리
 * @param {Cloneable} value - 복사할 값
 * @param {WeakMap<Cloneable, Cloneable>} cache - 순환 참조 처리를 위한 캐시
 * @returns {Cloneable} 복사된 값
 */
function cloneByType(value: Cloneable, cache: WeakMap<Cloneable, Cloneable>): Cloneable {
    const type = Object.prototype.toString.call(value);
    const cloner = TYPE_CLONERS[type] || cloneObject;
    return cloner(value, cache);
}

/**
 * 타입별 복사 함수 매핑
 */
const TYPE_CLONERS: { [key: string]: (value: Cloneable, cache: WeakMap<Cloneable, Cloneable>) => Cloneable } = {
    '[object Array]': cloneArray,
    '[object Object]': cloneObject,
    '[object Date]': cloneDate,
    '[object RegExp]': cloneRegExp,
    '[object Map]': cloneMap,
    '[object Set]': cloneSet,
};

/**
 * 배열 복사
 * @param {Array<Cloneable>} arr - 복사할 배열
 * @param {WeakMap<Cloneable, Cloneable>} cache - 순환 참조 처리를 위한 캐시
 * @returns {Array<Cloneable>} 복사된 배열
 */
function cloneArray(arr: Array<Cloneable>, cache: WeakMap<Cloneable, Cloneable>): Array<Cloneable> {
    return arr.map((item) => internalCloneDeep(item, cache));
}

/**
 * 객체 복사
 * @param {Record<string, Cloneable>} obj - 복사할 객체
 * @param {WeakMap<Cloneable, Cloneable>} cache - 순환 참조 처리를 위한 캐시
 * @returns {Record<string, Cloneable>} 복사된 객체
 */
function cloneObject(obj: Record<string, Cloneable>, cache: WeakMap<Cloneable, Cloneable>): Record<string, Cloneable> {
    const result = Object.create(Object.getPrototypeOf(obj));
    for (const key of Reflect.ownKeys(obj)) {
        const desc = Object.getOwnPropertyDescriptor(obj, key as string);
        if (desc) {
            if (desc.value !== undefined) {
                desc.value = internalCloneDeep(desc.value, cache);
            }
            Object.defineProperty(result, key, desc);
        }
    }
    return result;
}

/**
 * Date 객체 복사
 * @param {Date} date - 복사할 Date 객체
 * @returns {Date} 복사된 Date 객체
 */
function cloneDate(date: Date): Date {
    return new Date(date.getTime());
}

/**
 * RegExp 객체 복사
 * @param {RegExp} regexp - 복사할 RegExp 객체
 * @returns {RegExp} 복사된 RegExp 객체
 */
function cloneRegExp(regexp: RegExp): RegExp {
    return new RegExp(regexp.source, regexp.flags);
}

/**
 * Map 객체 복사
 * @param {Map<Cloneable, Cloneable>} map - 복사할 Map 객체
 * @param {WeakMap<Cloneable, Cloneable>} cache - 순환 참조 처리를 위한 캐시
 * @returns {Map<Cloneable, Cloneable>} 복사된 Map 객체
 */
function cloneMap(map: Map<Cloneable, Cloneable>, cache: WeakMap<Cloneable, Cloneable>): Map<Cloneable, Cloneable> {
    const result = new Map();
    for (const [key, value] of map) {
        result.set(internalCloneDeep(key, cache), internalCloneDeep(value, cache));
    }
    return result;
}

/**
 * Set 객체 복사
 * @param {Set<Cloneable>} set - 복사할 Set 객체
 * @param {WeakMap<Cloneable, Cloneable>} cache - 순환 참조 처리를 위한 캐시
 * @returns {Set<Cloneable>} 복사된 Set 객체
 */
function cloneSet(set: Set<Cloneable>, cache: WeakMap<Cloneable, Cloneable>): Set<Cloneable> {
    const result = new Set();
    for (const value of set) {
        result.add(internalCloneDeep(value, cache));
    }
    return result;
}
