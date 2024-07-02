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
 *  isNumeric('2e5'); // => true
 *
 *  isNumeric('string'); // => false
 *  isNumeric(' 45'); // => false
 * @category Guard
 */

export function isNumeric<T>(data: T): boolean {
    if (typeof data !== 'string') return false;

    // 내부 공백이 있는지 확인
    if (data.includes(' ')) return false;

    const trimData = data.trim();
    if (trimData === '') return false;

    // 콤마가 있는 경우 처리
    if (trimData.includes(',')) {
        return isNumericWithCommas(trimData);
    }

    // bigInt 숫자 처리
    if (typeof data === 'bigint') return true;

    // 지수 표기법 처리
    if (trimData.toLowerCase().includes('e')) {
        return isNumericExponential(trimData);
    }

    // 파싱된 숫자를 다시 문자열로 변환하여 원본과 비교
    const numericValue = parseFloat(trimData);
    if (trimData !== String(numericValue)) return false;

    // 일반적인 숫자 처리
    return !isNaN(numericValue) && isFinite(numericValue);
}

export function isNumericWithCommas<T>(data: T): boolean {
    // 입력 데이터가 문자열이 아닌 경우 false 반환
    if (typeof data !== 'string') return false;

    const parts = data.split(',');

    // 첫 부분을 제외한 나머지 부분이 모두 3자리인지 확인
    if (!parts.slice(1).every((part) => part.length === 3)) return false;

    // 콤마를 제거하고 일반 숫자로 확인
    const numData = parts.join('');

    return !isNaN(parseFloat(numData)) && isFinite(Number(numData));
}

export function isNumericExponential<T>(data: T): boolean {
    // 입력 데이터가 문자열이 아닌 경우 false 반환
    if (typeof data !== 'string') return false;

    const parts = data.toLowerCase().split('e');
    if (parts.length !== 2) return false;

    const [base, exponent] = parts;

    // 기수와 지수 모두 유효한 숫자인지 확인
    return isNumeric(base) && isNumeric(exponent);
}
