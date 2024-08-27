/**
 * 주어진 값이 Date 객체인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 Date 객체이면 true, 아니면 false
 * @signature
 *  isDate(data)
 * @example
 *  isDate(new Date()) // => true
 *  isDate(new Date('2023-01-01')) // => true
 *
 *  isDate('2023-01-01') // => false
 *  isDate(1672531200000) // => false
 *  isDate({}) // => false
 *  isDate(null) // => false
 * @category Guard
 */
export function isDate(data: unknown): data is Date {
    return data instanceof Date && !isNaN(data.getTime());
}
