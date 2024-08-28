/**
 * 키-값 쌍의 배열을 단일 객체로 정규화합니다.
 *
 * @template T 입력 배열의 요소 타입 (각 요소는 단일 키-값 쌍을 가진 객체)
 *
 * @param {T[]} array 정규화할 키-값 쌍의 배열
 *
 * @throws {TypeError} 입력이 배열이 아닌 경우 발생
 * @throws {TypeError} 배열의 요소가 객체가 아니거나, 정확히 하나의 키-값 쌍을 가지지 않은 경우 발생
 *
 * @returns {Record<keyof T[number], T[number][keyof T[number]]>} 모든 키-값 쌍을 단일 객체로 병합한 결과
 *
 * @example
 * const input = [
 *   {"02ea4071-8ee3":"112"},
 *   {"02edc507-8ee3":"72"},
 *   {"02ef56ad-8ee3":"70"}
 * ];
 * const normalized = normalize(input);
 * // 결과:
 * // {
 * //   "02ea4071-8ee3": "112",
 * //   "02edc507-8ee3": "72",
 * //   "02ef56ad-8ee3": "70"
 * // }
 */
export function normalize<T extends Record<string, unknown>[]>(
    array: T,
): Record<keyof T[number], T[number][keyof T[number]]> {
    if (!Array.isArray(array)) {
        throw new TypeError('입력은 반드시 배열이어야 합니다.');
    }

    const result: Record<string, unknown> = {};

    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (typeof item !== 'object' || item === null) {
            throw new TypeError('배열의 각 요소는 객체여야 합니다.');
        }

        const keys = Object.keys(item);
        if (keys.length !== 1) {
            throw new TypeError('각 객체는 정확히 하나의 키-값 쌍을 가져야 합니다.');
        }

        const key = keys[0];
        result[key] = item[key];
    }

    return result as Record<keyof T[number], T[number][keyof T[number]]>;
}
