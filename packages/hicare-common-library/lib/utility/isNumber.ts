/**
 * 주어진 데이터가 숫자인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 숫자이면 true, 아니면 false.
 * @signature
 *  isNumber(data)
 * @example
 *  isNumber(1); // => true
 *  isNumber(2*82163); // => true
 *  isNumber(Infinity); // => true
 *  isNumber(-123); // => true
 *
 *  isNumber('string'); // => false
 *  isNumber(1n); // => false
 * @category Guard
 */

export function isNumber<T>(data: T): boolean {
    return typeof data === 'number' && !Number.isNaN(data);
}
