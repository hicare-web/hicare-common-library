/**
 * 주어진 값이 Promise 객체인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 Promise 객체이면 true, 아니면 false
 * @signature
 *  isPromise(data)
 * @example
 *  isPromise(Promise.resolve()) // => true
 *  isPromise(new Promise(() => {})) // => true
 *
 *  isPromise({ then: () => {} }) // => false
 *  isPromise(() => {}) // => false
 *  isPromise({}) // => false
 *  isPromise(null) // => false
 * @category Guard
 */
export function isPromise(data: unknown): data is Promise<unknown> {
    return data instanceof Promise;
}
