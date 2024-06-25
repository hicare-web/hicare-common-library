/**
 * 받은 데이터가 빈값인지 확인하는 함수
 *  > undefined, null, '', [], {}를 빈값으로 판단
 *  > 객체가 문자열 키 속성을 가지고 있지 않으면 빈값으로 판단
 *  > 배열, arguments 객체, buffer, string, jQuery 등은 length가 0이면 빈값으로 판단
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
 *  isEmpty(undefined) //=> true
 *  isEmpty('') //=> true
 *  isEmpty([]) //=> true
 *  isEmpty({}) //=> true
 *  isEmpty(null) //=> true
 *
 *  isEmpty('test') //=> false
 *  isEmpty([1, 2, 3]) //=> false
 *  isEmpty({ length: 0 }) //=> false
 *  isEmpty({ key: 'value' }) //=> false
 *  isEmpty(0) //=> false
 *  isEmpty(false) //=> false
 *
 * @category Guard
 */

type EmptyCheckable =
    | string
    | number
    | null
    | boolean
    | undefined
    | unknown[]
    | Record<PropertyKey, unknown>
    | Map<unknown, unknown>
    | Set<unknown>
    | Buffer;

export function isEmpty<T extends EmptyCheckable>(
    data: T,
): data is T &
    (T extends string
        ? ''
        : T extends undefined
          ? undefined
          : T extends unknown[]
            ? []
            : T extends Map<unknown, unknown>
              ? Map<never, never>
              : T extends Set<unknown>
                ? Set<never>
                : T extends Buffer
                  ? Buffer & { length: 0 }
                  : T extends Record<PropertyKey, unknown>
                    ? Record<keyof T, never>
                    : never) {
    if (data === undefined || data === null) {
        return true;
    }
    if (typeof data === 'string') {
        return data.length === 0;
    }
    if (Array.isArray(data)) {
        return data.length === 0;
    }
    if (data instanceof Map || data instanceof Set) {
        return data.size === 0;
    }
    if (Buffer.isBuffer(data)) {
        return data.length === 0;
    }
    if (typeof data === 'object' && data !== null) {
        return Object.keys(data).length === 0;
    }
    return false;
}
