/**
 * 객체에서 지정된 경로의 값을 안전하게 가져옵니다.
 *
 * @param object - 검색할 객체
 * @param path - 속성 경로 (문자열 또는 문자열 배열)
 * @param defaultValue - 값이 없을 경우 반환할 기본값 (선택적)
 * @returns 찾은 값 또는 기본값
 *
 * @example
 * const obj = { a: [{ b: { c: 3 } }] };
 * console.log(get(obj, 'a[0].b.c'));  // 3
 * console.log(get(obj, ['a', '0', 'b', 'c']));  // 3
 * console.log(get(obj, 'a.b.c', 'default'));  // 'default'
 * console.log(get(obj, 'a[0].b.d'));  // undefined
 * console.log(get(obj, 'a[0].b.d', 'not found'));  // 'not found'
 *
 * @category Object
 */
export function get(object: any, path: string | string[], defaultValue?: any): any {
    // 경로가 문자열인 경우 배열로 변환
    const keys = Array.isArray(path) ? path : parsePath(path);

    let result = object;
    for (const key of keys) {
        if (result == null || typeof result !== 'object') {
            return defaultValue;
        }
        result = result[key];
    }

    return result === undefined ? defaultValue : result;
}

/**
 * 문자열 경로를 파싱하여 키 배열로 변환합니다.
 *
 * @param path - 파싱할 경로 문자열
 * @returns 키 배열
 */
function parsePath(path: string): string[] {
    // 정규표현식을 사용하여 경로를 파싱
    // 이 정규표현식은 점 표기법과 대괄호 표기법을 모두 처리합니다.
    return path.match(/[^.[\]]+/g) || [];
}
