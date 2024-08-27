/**
 * 무작위 숫자 또는 문자열을 생성합니다.
 *
 * @param min - 최소값 (포함) 또는 문자열 길이
 * @param max - 최대값 (포함)
 * @param type - 생성할 타입 ('number' 또는 'string', 기본값은 'number')
 * @returns 생성된 무작위 숫자 또는 문자열
 *
 * @example
 * // 숫자 범위
 * console.log(random(1, 10));  // 1에서 10 사이의 무작위 정수
 * console.log(random(1.5, 3.7));  // 1.5에서 3.7 사이의 무작위 부동 소수점 숫자
 *
 * // 문자열 길이
 * console.log(random(5, 'string'));  // 길이가 5인 무작위 문자열
 * console.log(random(10, 'string'));  // 길이가 10인 무작위 문자열
 *
 * // 숫자 또는 문자열
 * console.log(random(1, 10, 'number/string'));  // 1에서 10 사이의 무작위 정수 또는 길이가 1에서 10 사이인 무작위 문자열
 *
 * @category Math
 */
export function random(min: number, max: number): number;
export function random(length: number, type: 'string'): string;
export function random(arg1: number, arg2: number | 'string' | 'number/string'): number | string {
    // 숫자 범위 생성
    if (typeof arg2 === 'number') {
        return randomNumber(arg1, arg2);
    }

    // 문자열 생성
    if (arg2 === 'string') {
        return randomString(arg1);
    }

    throw new Error('Invalid arguments');
}

/**
 * 주어진 범위 내의 무작위 숫자를 생성합니다.
 */
function randomNumber(min: number, max: number): number {
    if (Number.isInteger(min) && Number.isInteger(max)) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return Math.random() * (max - min) + min;
}

/**
 * 주어진 길이의 무작위 문자열을 생성합니다.
 */
function randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
