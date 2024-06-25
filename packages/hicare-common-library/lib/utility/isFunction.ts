/**
 * 주어진 변수가 함수인지 확인하는 함수
 *
 * @param data - 확인할 변수
 * @returns 데이터가 함수이면 true, 아니면 false.
 * @signature
 *  isFunction(data)
 * @example
 *  isFunction(() => {}) //=> true
 *  isFunction(Math.round) // => true
 *  isFunction(function * Any() {}) //=> true
 *  isFunction(class Any{}) // => true
 *
 *  isFunction('string') //=> false
 * isFunction(123) //=> false
 * isFunction({}) //=> false
 * isFunction([]) //=> false
 * isFunction(null) //=> false
 *
 * @category Guard
 */

export function isFunction<T>(data: T): data is T & Function {
    return typeof data === 'function';
}
