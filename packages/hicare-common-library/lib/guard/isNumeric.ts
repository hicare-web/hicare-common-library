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
    if (typeof data !== 'string' && typeof data !== 'number') return false;

    // 문자열인 경우 내부 공백 확인
    if (typeof data === 'string') {
        if (data.includes(' ')) return false;

        data = data.trim() as unknown as T;
        if (data === '') return false;
    }

    // bigInt 숫자 처리
    if (typeof data === 'bigint') return true;

    // 콤마가 있는 경우 처리
    if (typeof data === 'string' && data.includes(',')) {
        return isNumericWithCommas(data);
    }

    // 지수 표기법 처리
    if (typeof data === 'string' && data.toLowerCase().includes('e')) {
        return isNumericExponential(data);
    }

    // 일반적인 숫자 처리
    const numericValue = Number(data);
    return !isNaN(numericValue) && isFinite(numericValue);
}

function isNumericWithCommas(data: string): boolean {
    const parts = data.split(',');

    // 소수점 처리
    const lastPart = parts[parts.length - 1];
    const decimalIndex = lastPart.indexOf('.');
    let decimalPart = '';
    if (decimalIndex !== -1) {
        decimalPart = lastPart.slice(decimalIndex + 1);
        if (!/^\d+$/.test(decimalPart)) return false;
        parts[parts.length - 1] = lastPart.slice(0, decimalIndex);
    }

    // 첫 부분을 제외한 나머지 부분이 모두 3자리인지 확인
    if (!parts.slice(1).every((part) => part.length === 3)) return false;

    // 콤마를 제거하고 일반 숫자로 확인
    const numData = parts.join('') + (decimalIndex !== -1 ? '.' + decimalPart : '');
    return !isNaN(parseFloat(numData)) && isFinite(Number(numData));
}

function isNumericExponential(data: string): boolean {
    const parts = data.toLowerCase().split('e');
    if (parts.length !== 2) return false;

    const [base, exponent] = parts;

    // 기수와 지수 모두 유효한 숫자인지 확인
    // 음수 지수 허용
    return isNumeric(base) && /^[+-]?\d+$/.test(exponent);
}