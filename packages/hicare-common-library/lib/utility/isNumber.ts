/**
 * 주어진 데이터가 숫자인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 숫자이면 true, 아니면 false.
 * @signature
 *  isNumber(data)
 * @example
 *  isNumber(1); // => true
 *  isNumber(1n); // => false
 *  isNumber(Infinity); // => true
 *  isNumber('string'); // => false
 * @category Guard
 */
export function isNumber<T>(data: T | number): data is number {
    return typeof data === 'number' && !Number.isNaN(data);
}
