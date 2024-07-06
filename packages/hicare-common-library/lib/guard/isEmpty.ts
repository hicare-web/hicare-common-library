/**
 * 받은 데이터가 빈값인지 확인하는 함수
 *  > undefined, null, '', [], {}를 빈값으로 판단
 *  > 객체가 문자열 키 속성을 가지고 있지 않으면 빈값으로 판단
 *  > 배열, arguments 객체, buffer, string등은 length가 0이면 빈값으로 판단
 *  > map, sets는 size가 0이면 빈값으로 판단
 *
 *
 * TypeScript의 제한으로 인해 부정형으로는 작동하지 않으니 !isEmpty(data)는 사용하지 말 것
 *
 * @param data - 받은 변수
 * @returns data가 비어있으면 true를, 아니면 false를 반환
 * @signature
 *  isEmpty(data)
 * @example
 * isEmpty(undefined);  // true
 * isEmpty(null);       // true
 * isEmpty('');         // true
 * isEmpty('  ');       // true
 * isEmpty([]);         // true
 * isEmpty({});         // true
 * isEmpty(new Set());  // true
 * isEmpty(new Map());  // true
 * isEmpty(NaN);        // true
 * isEmpty(new Date('Invalid Date')); // true
 *
 * isEmpty('hello');    // false
 * isEmpty([1, 2, 3]);  // false
 * isEmpty({ a: 1 });   // false
 * isEmpty(0);          // false
 * isEmpty(false);      // false
 *
 * @category Guard
 */
export function isEmpty(data: unknown): boolean {
    if (data == null) {
        // null과 undefined 체크
        return true;
    }

    if (typeof data === 'string') {
        return data.trim() === '';
    }

    if (Array.isArray(data)) {
        return data.length === 0;
    }

    if (data instanceof Set || data instanceof Map) {
        return data.size === 0;
    }

    if (typeof data === 'object') {
        if (data instanceof Date) {
            return isNaN(data.getTime());
        }
        return Object.keys(data as object).length === 0;
    }

    if (typeof data === 'number') {
        return isNaN(data);
    }

    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
        return data.length === 0;
    }

    return false;
}
