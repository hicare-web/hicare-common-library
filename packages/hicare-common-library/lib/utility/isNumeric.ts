/**
 * 주어진 데이터가 숫자 형태를 가진 문자열인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 숫자 형태를 가진 문자열이면 true, 아니면 false 반환
 * @signature
 *  isNumeric(data)
 * @example
 *  isNumeric(1); // => true
 *  isNumeric(2*82163); // => true
 *  isNumeric(Infinity); // => true
 *  isNumeric(-123); // => true
 *  isNumeric(1n); // => true
 *  isNumeric(10e3); // => true
 *
 *  isNumeric('string'); // => false
 * @category Guard
 */

export function isNumeric<T>(value: T): boolean {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return true;
    }

    // BigInt 타입 처리
    if (typeof value === 'bigint') {
        return true;
    }

    // 문자열 처리
    if (typeof value === 'string' && value.trim() !== '') {
        // 정규표현식을 사용하여 숫자 형식 검사
        const numericRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?n?$/;
        return numericRegex.test(value.trim());
    }

    return false;
}
