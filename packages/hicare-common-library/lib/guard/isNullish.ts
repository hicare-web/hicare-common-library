/**
 * 받은 값이 null 또는 undefined인지 확인하는 함수
 *
 * @param data - 확인할 변수
 * @returns 입력 값이 null 또는 undefined인 경우 true, 그렇지 않으면 false 반환2
 * @signature
 * isNullish(data)
 * @example
 * isNullish(null) //=> true
 * isNullish(undefined) //=> true
 * isNullish('string') //=> false
 * isNullish(0) //=> false
 * ...
 * @category Guard
 */
export function isNullish<T>(data: T): boolean {
    return data === null || data === undefined;
}
