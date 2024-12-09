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
    // 기본형 값은 그대로 반환
    if (isPrimitive(value)) return value;

    // null 체크 추가
    if (value === null) return value;

    // 순환 참조 체크: 이미 복사한 객체라면 캐시된 값을 반환
    if (cache.has(value)) {
        return cache.get(value) as T;
    }

    // 객체의 초기 "껍데기"를 먼저 생성하고 캐시에 저장
    const result = createEmptyObject(value);
    cache.set(value, result);

    // 그 후에 객체의 내용을 채움
    fillObject(value, result, cache);

    return result as T;
}

/**
 * 빈 객체 생성 함수
 * @param {Cloneable} value - 원본 값
 * @returns {Cloneable} 빈 객체
 */
function createEmptyObject(value: Cloneable): Cloneable {
    const type = Object.prototype.toString.call(value);
    switch (type) {
        case '[object Array]':
            return [];
        case '[object Map]':
            return new Map();
        case '[object Set]':
            return new Set();
        case '[object Date]':
            return new Date(value.getTime());
        case '[object RegExp]':
            return new RegExp(value.source, value.flags);
        default:
            return Object.create(Object.getPrototypeOf(value));
    }
}

/**
 * 객체의 내용을 채우는 함수
 * @param {Cloneable} source - 원본 객체
 * @param {Cloneable} target - 대상 객체
 * @param {WeakMap<Cloneable, Cloneable>} cache - 순환 참조 처리를 위한 캐시
 */
function fillObject(source: Cloneable, target: Cloneable, cache: WeakMap<Cloneable, Cloneable>): void {
    const type = Object.prototype.toString.call(source);

    switch (type) {
        case '[object Array]':
            (source as Array<any>).forEach((item, index) => {
                (target as Array<any>)[index] = internalCloneDeep(item, cache);
            });
            break;

        case '[object Map]':
            (source as Map<any, any>).forEach((value, key) => {
                (target as Map<any, any>).set(internalCloneDeep(key, cache), internalCloneDeep(value, cache));
            });
            break;

        case '[object Set]':
            (source as Set<any>).forEach((value) => {
                (target as Set<any>).add(internalCloneDeep(value, cache));
            });
            break;

        case '[object Date]':
        case '[object RegExp]':
            // 이미 createEmptyObject에서 처리됨
            break;

        default:
            // 일반 객체
            for (const key of Reflect.ownKeys(source)) {
                const desc = Object.getOwnPropertyDescriptor(source, key);
                if (desc) {
                    if (desc.value !== undefined) {
                        desc.value = internalCloneDeep(desc.value, cache);
                    }
                    Object.defineProperty(target, key, desc);
                }
            }
            break;
    }
}
