import type { PersonName } from 'lib/types'; // format 함수를 import합니다.
import { format } from './format';

/**
 * 주어진 이름 정보를 바탕으로 전체 이름을 형식화하여 반환합니다.
 * 이름은 "성, 이름 중간이름" 형식으로 반환되며, 중간이름은 선택적입니다.
 * lastName 또는 firstName이 없는 경우 해당 부분은 빈 문자열로 처리됩니다.
 *
 * @param {string | PersonName} nameOrLastName - 성(lastName) 또는 전체 이름 정보를 담은 객체
 * @param {string} [firstName] - 이름 (nameOrLastName이 객체가 아닐 경우)
 * @param {string} [middleName] - 중간 이름 (선택적)
 *
 * @returns {string} 형식화된 전체 이름
 *
 * @example
 * // 개별 문자열로 사용
 * getPersonFullName('Doe', 'John'); // 반환값: "Doe, John"
 * getPersonFullName('Doe', 'John', 'Michael'); // 반환값: "Doe, John Michael"
 * getPersonFullName('', 'John'); // 반환값: ", John"
 * getPersonFullName('Doe'); // 반환값: "Doe, "
 *
 * @example
 * // 객체로 사용
 * getPersonFullName({ lastName: 'Doe', firstName: 'Jane' }); // 반환값: "Doe, Jane"
 * getPersonFullName({ lastName: 'Doe', firstName: 'Jane', middleName: 'Elizabeth' }); // 반환값: "Doe, Jane Elizabeth"
 * getPersonFullName({ firstName: 'Jane' }); // 반환값: ", Jane"
 * getPersonFullName({}); // 반환값: ", "
 */
export function getPersonFullName(
    nameOrLastName: string | PersonName,
    firstName?: string,
    middleName?: string,
): string {
    let lastName: string = '';

    if (typeof nameOrLastName === 'object') {
        lastName = nameOrLastName.lastName || '';
        firstName = nameOrLastName.firstName || '';
        middleName = nameOrLastName.middleName;
    } else {
        lastName = nameOrLastName || '';
        firstName = firstName || '';
    }

    return format('{:}, {:}{:}', lastName, firstName, middleName ? ` ${middleName}` : '');
}
