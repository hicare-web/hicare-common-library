/**
 * 주어진 데이터가 숫자 형태를 가진 문자열인지 확인하는 함수
 *
 * @param data - 확인할 데이터
 * @returns 데이터가 숫자 형태를 가진 문자열이면 true, 아니면 false 반환
 * @signature
 *  isNumeric(data)
 * @example
 *  isNumeric(1) // => true
 *  isNumeric('123') // => true
 *  isNumeric('123.45') // => true
 *  isNumeric('-123.45') // => true
 *  isNumeric('123,456.78') // => true
 *  isNumeric('1e10') // => true
 *  isNumeric('0xff') // => true
 *
 *  isNumeric('123abc') // => false
 *  isNumeric('') // => false
 *  isNumeric(' ') // => false
 *  isNumeric('0x') // => false
 *  isNumeric('x1') // => false
 *  isNumeric('NaN') // => false
 *  isNumeric('Infinity') // => false
 *  isNumeric(null) // => false
 *  isNumeric(undefined) // => false
 *  isNumeric({}) // => false
 *  isNumeric([]) // => false
 * @category Guard
 */
export function isNumeric(data: unknown): boolean {
    if (typeof data === 'number') return !isNaN(data) && isFinite(data);
    if (typeof data !== 'string') return false;

    const trimmed = data.trim();
    if (trimmed === '') return false;
    if (trimmed === 'NaN' || trimmed === 'Infinity' || trimmed === '-Infinity') return false;

    // Check for hexadecimal strings
    if (/^0x[0-9a-f]+$/i.test(trimmed)) {
        return true;
    }

    // Check for numbers with commas
    if (trimmed.includes(',')) {
        // This regex checks for correct comma placement and allows for decimal points
        return /^-?(\d{1,3}(,\d{3})*(\.\d+)?|\d+(\.\d+)?)$/.test(trimmed);
    }

    // Check for numbers in standard or scientific notation
    return /^[-+]?(\d*\.?\d+|\d+\.?\d*)([eE][-+]?\d+)?$/.test(trimmed);
}
