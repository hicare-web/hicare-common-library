/**
 *  첫 번째 인자가 두 번째 인자에 포함되는지 확인하는 함수
 *  이 함수는 ``Array.prototype.includes`` 및 ``Set.prototype.has``를 감싸는 래퍼이므로
 *  해당 함수가 수행하는 것과 동일한 동일성 검사(참조 동일성 : `===`)에 의존합니다.
 *  경우에 따라 입력 유형이 컨테이너의 항목 유형으로 좁혀지기도 합니다.
 *  대부분의 함수와 달리 이 함수는 일반 항목을 데이터로,배열을 매개변수로 받습니다.
 *
 * @param data - 확인할 변수
 * @param container - 확인할 배열
 * @returns container안에 data가 있으면 true, 없으면 false 반환
 * @signature
 *  isIncludedIn(data, container);
 * @example
 *  isIncludedIn(2, [1, 2, 3]); // => true
 *  isIncludedIn(4, [1, 2, 3]); // => false
 *
 * @dataFirst
 * @category Guard
 */

export function isIncludedIn<T>(value: T, array: T[]): boolean;
export function isIncludedIn<T>(value: T, iterable: Iterable<T>): boolean;
export function isIncludedIn<T>(value: T, container: T[] | Iterable<T>): boolean {
    if (Array.isArray(container)) {
        return container.includes(value);
    } else {
        for (const item of container) {
            if (item === value) {
                return true;
            }
        }
        return false;
    }
}
