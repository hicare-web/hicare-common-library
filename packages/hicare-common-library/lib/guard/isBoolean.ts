/**
 * 전달된 데이터가 boolean인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 boolean이면 true, boolean이 아니면 false 반환
 * @signature
 *  isBoolean(data)
 * @example
 *  isBoolean(true) //=> true
 *  isBoolean(false) //=> true
 *  isBoolean('somethingElse') //=> false
 *  isBoolean(123) //=> false
 *  ...
 * @category Guard
 */

export function isBoolean(data: unknown): data is boolean {
    return typeof data === 'boolean';
}
