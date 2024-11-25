import { isFinite } from 'lib/guard/isFinite';
import { isNaN } from 'lib/guard/isNaN';

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

export function isNumber(data: unknown): data is number {
    return typeof data === 'number' && !isNaN(data);
}

/**
 * 주어진 데이터가 정수인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 정수이면 true, 아니면 false
 * @signature
 *  isInteger(data)
 * @example
 *  isInteger(1) // => true
 *  isInteger(-5) // => true
 *  isInteger(0) // => true
 *
 *  isInteger(1.5) // => false
 *  isInteger(NaN) // => false
 *  isInteger(Infinity) // => false
 *  isInteger('1') // => false
 *  isInteger(true) // => false
 *  isInteger(null) // => false
 *  isInteger(undefined) // => false
 *  isInteger({}) // => false
 *  isInteger([]) // => false
 * @category Guard
 */
export function isInteger(data: unknown): data is number {
    return isNumber(data) && isFinite(data) && Math.floor(data) === data;
}
