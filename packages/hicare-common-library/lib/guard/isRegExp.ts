/**
 * 주어진 값이 정규표현식 객체인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 정규표현식 객체이면 true, 아니면 false
 * @signature
 *  isRegExp(data)
 * @example
 *  isRegExp(/test/) // => true
 *  isRegExp(new RegExp('test')) // => true
 *
 *  isRegExp('/test/') // => false
 *  isRegExp('test') // => false
 *  isRegExp({}) // => false
 *  isRegExp(null) // => false
 * @category Guard
 */
export function isRegExp(data: unknown): data is RegExp {
    return data instanceof RegExp;
}
