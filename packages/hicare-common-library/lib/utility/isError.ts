/**
 * 전달된 데이터가 Error인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 Error인 경우 true, 아니면 false.
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

type DefinitelyError<T> = Extract<T, Error> extends never ? Error : Extract<T, Error>;

export function isError<T>(data: Error | T): data is DefinitelyError<T> {
    return data instanceof Error;
}
