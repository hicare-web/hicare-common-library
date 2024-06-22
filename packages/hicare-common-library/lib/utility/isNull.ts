/**
 * 받은 값이 null인지 확인하는 함수
 *
 * @param data - 확인할 변수값
 * @returns 입력 값이 null인 경우 true, 그렇지 않으면 false 반환
 * @signature
 * isNull(data)
 * @example
 * isNull(null) //=> true
 * isNull(undefined) //=> false
 * isNull('string') //=> false
 * isNull(0) //=> false
 * ...
 * @category Guard
 */

export const isNull = <T>(data: T | null): data is null => {
    return data === null;
};
