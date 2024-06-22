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

export type NarrowedTo<T, U> = T extends U ? T : never;

export function isBoolean<T>(data: T | boolean): data is NarrowedTo<T, boolean> {
    return typeof data === 'boolean';
}
