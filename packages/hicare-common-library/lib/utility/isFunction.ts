type DefinitelyFunction<T> = Extract<T, Function> extends never ? Function : Extract<T, Function>;

/**
 * 주어진 데이터가가 함수인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 함수이면 true, 아니면 false.
 * @signature
 *  isFunction(data)
 * @example
 *  isFunction(() => {}) //=> true
 *  isFunction(Math.round) // => true
 *  isFunction(function * Any() {}) //=> true
 *  isFunction(class Any{}) // => true
 *  isFunction('string') //=> false
 *
 * @category Guard
 */
export function isFunction<T>(data: Function | T): data is DefinitelyFunction<T> {
    return typeof data === 'function';
}
