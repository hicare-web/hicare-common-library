/**
* 받은 데이터가 문자열인지 확인하는 함수
*
* @param data - 확인할 변수
* @returns data가 문자열인 경우 true, 아니면 false
* @signature
* isString(data)
* @example
* isString('string') //=> true
* 
* isString(1) //=> false
* isString(null) //=> false
* isString(undefined) //=> false
* isString({}) //=> false
* isString([]) //=> false
* isString(new Date()) //=> false
* isString(new Error()) //=> false
* isString(() => {}) //=> false

* @category Guard
*/

type IsAny<T> = 0 extends 1 & T ? true : false;
type NarrowedTo<T, U> = Extract<T, U> extends never ? U : IsAny<T> extends true ? U : Extract<T, U>;

export function isString<T>(data: T | string): data is NarrowedTo<T, string> {
    return typeof data === 'string';
}
