import { isObjectType } from 'remeda';

/**
 *  첫 번째 인자가 두 번째 인자에 포함되는지 확인하는 함수
 *  이 함수는 ``Array.prototype.includes`` 및 ``Set.prototype.has``를 감싸는 래퍼이므로
 *  해당 함수가 수행하는 것과 동일한 동일성 검사(참조 동일성 : `===`)에 의존합니다.
 *  경우에 따라 입력 유형이 컨테이너의 항목 유형으로 좁혀지기도 합니다.
 *  대부분의 함수와 달리 이 함수는 일반 항목을 데이터로,배열을 매개변수로 받습니다.
 *
 * @param value - 확인할 변수
 * @param parameter - 확인할 배열
 * @returns container안에 data가 있으면 true, 없으면 false 반환
 * @signature
 *  isIncludedIn(data, container);
 * @example
 *  isIncludedIn(2, [1, 2, 3]); // => true
 *  isIncludedIn(4, [1, 2, 3]); // => false
 *  isIncludedIn('1', { a: 1, b: 2 }); // => true
 *  isIncludedIn('3', { a: 1, b: 2 }); // => false
 *  isIncludedIn('1', new Set(['1', '2', '3'])); // => true
 *  isIncludedIn('4', new Set(['1', '2', '3'])); // => false
 *  isIncludedIn('1', new Map([['a', '1'], ['b', '2']])); // => true
 *  isIncludedIn('3', new Map([['a', '1'], ['b', '2']])); // => false
 *
 * @dataFirst
 * @category Guard
 */
export function isIncludedIn<T>(value: T, parameter: T | T[] | Set<T> | Map<string, T>): boolean {
    if (isObjectType(parameter)) {
        const keys = Object.keys(parameter);
        if (keys.length === 0) {
            return false;
        }

        for (const key of keys) {
            if (parameter[key] === value) {
                return true;
            }
        }

        return false;
    } else {
        let array = [] as T[];
        if (parameter instanceof Set) {
            array = Array.from(parameter) as T[];
        } else if (Array.isArray(parameter)) {
            array = parameter as T[];
        } else if (parameter instanceof Map) {
            array = Array.from(parameter.values()) as T[];
        }

        const length = array.length;
        let index = 0;
        while (index < length) {
            if (array[index] === value) {
                return true;
            }
            index++;
        }

        return false;
    }
}
