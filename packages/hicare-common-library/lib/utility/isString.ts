/**
* 받은 변수가 문자열인지 확인하는 함수
*
* @param data - 확인할 변수
* @returns data가 문자열인 경우 true, 아니면 false
* @signature
* isString(data)
* @example
* isString('string') //=> true
* isString('') //=> true
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

export function isString<T>(data: T): boolean {
    return typeof data === 'string';
}
