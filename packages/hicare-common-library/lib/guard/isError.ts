/**
 * 받은 데이터가 Error인지 확인하는 함수
 *
 * @param data - 확인할 변수
 * @returns 데이터가 Error인 경우 true, 아니면 false 반환
 * @signature
 *  isError(data)
 * @example
 *  isError(new Error('message')) //=> true
 *
 * isError('') //=> false
 * isError({}) //=> false
 * isError([]) //=> false
 * isError(Promise.resolve('string')) //=> false
 * isError(new Date()) //=> false
 * isError(Object.create(null)) //=> false
 * isError(0) //=> false
 *
 * @category Guard
 */

export function isError<T>(data: T): boolean {
    return data instanceof Error;
}
