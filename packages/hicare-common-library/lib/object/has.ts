/**
 * 객체가 지정된 경로의 속성을 가지고 있는지 확인합니다.
 *
 * @param object - 검사할 객체
 * @param path - 속성 경로 (문자열 또는 문자열 배열)
 * @returns 지정된 경로의 속성이 존재하면 true, 그렇지 않으면 false
 *
 * @example
 * const obj = { a: [{ b: { c: 3 } }] };
 * console.log(has(obj, 'a[0].b.c'));  // true
 * console.log(has(obj, ['a', '0', 'b', 'c']));  // true
 * console.log(has(obj, 'a.b.c'));  // false
 * console.log(has(obj, 'a[0].b.d'));  // false
 * console.log(has(obj, 'a[1].b.c'));  // false
 *
 * @category Object
 */
export function has(object: any, path: string | string[]): boolean {
    const keys = Array.isArray(path) ? path : parsePath(path);

    let current = object;
    for (const key of keys) {
        if (current == null || !Object.prototype.hasOwnProperty.call(current, key)) {
            return false;
        }
        current = current[key];
    }

    return true;
}

/**
 * 문자열 경로를 파싱하여 키 배열로 변환합니다.
 *
 * @param path - 파싱할 경로 문자열
 * @returns 키 배열
 */
function parsePath(path: string): string[] {
    return path.match(/[^.[\]]+/g) || [];
}
