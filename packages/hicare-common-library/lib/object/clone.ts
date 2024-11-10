/**
 * 주어진 값의 얕은 복사본을 생성합니다.
 * 객체와 배열의 경우 최상위 속성/요소만 복사하며, 중첩된 객체나 배열은 참조를 복사합니다.
 * 기본 타입(number, string, boolean, null, undefined)의 경우 원본 값을 그대로 반환합니다.
 *
 * @template T - 복사할 값의 타입
 * @param {T} value - 복사할 값
 * @returns {T} 얕은 복사된 값
 *
 * @example
 * // 객체 복사
 * const obj = { a: 1, b: { c: 2 } };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: { c: 2 } }
 * console.log(clonedObj !== obj); // true
 * console.log(clonedObj.b === obj.b); // true
 *
 * // 배열 복사
 * const arr = [1, { x: 2 }, [3]];
 * const clonedArr = clone(arr);
 * console.log(clonedArr); // [1, { x: 2 }, [3]]
 * console.log(clonedArr !== arr); // true
 * console.log(clonedArr[1] === arr[1]); // true
 *
 * // 기본 타입 복사
 * console.log(clone(42) === 42); // true
 * console.log(clone("hello") === "hello"); // true
 *
 * @category Object - Manipulation
 */
export function clone<T>(value: T): T {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        return value.slice() as T;
    }

    return Object.assign({}, value);
}
