// 기존의 uniqBy 함수 (작은 데이터셋용)
/**
 * 주어진 배열에서 중복된 요소를 제거합니다.
 * 각 요소의 고유성은 제공된 키 추출기 함수에 의해 결정됩니다.
 * 이 함수는 작은 데이터셋(예: 10,000개 미만의 요소)에 적합합니다.
 *
 * @template T 배열 요소의 타입
 * @template K 키의 타입
 * @param {T[]} array - 중복 제거할 원본 배열
 * @param {(item: T) => K} keyExtractor - 각 요소에서 고유 키를 추출하는 함수
 * @returns {T[]} 중복이 제거된 새 배열
 * @throws {Error} 입력이 배열이 아니거나 keyExtractor가 함수가 아닌 경우 에러를 던집니다.
 *
 * @example
 * const array = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 1, name: 'John' }];
 * const result = uniqBy(array, item => item.id);
 * console.log(result); // 출력: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 */
type KeyFunction<T, K> = (item: T) => K;
export function uniqBy<T, K>(array: ReadonlyArray<T>, keyFunction: KeyFunction<T, K>): T[] {
    const set = new Set<K>();
    const result: T[] = [];
    const length = array.length;
    let i = 0;

    for (i = 0; i < length; i++) {
        const item = array[i];
        const key = keyFunction(item);
        if (!set.has(key)) {
            set.add(key);
            result.push(item);
        }
    }

    return result;
}

/**
 * 주어진 배열에서 중복된 요소를 제거하는 제너레이터 함수입니다.
 * 각 요소의 고유성은 제공된 키 추출기 함수에 의해 결정됩니다.
 * 이 함수는 특히 대규모 데이터셋(예: 10,000개 이상의 요소)에 효과적입니다.
 *
 * @template T 배열 요소의 타입
 * @template K 키의 타입
 * @param {T[]} array - 중복 제거할 원본 배열
 * @param {(item: T) => K} keyExtractor - 각 요소에서 고유 키를 추출하는 함수
 * @yields {T} 중복이 제거된 요소들
 * @throws {Error} 입력이 배열이 아니거나 keyExtractor가 함수가 아닌 경우 에러를 던집니다.
 *
 * @example
 * // 대규모 데이터셋 (100,000개의 요소)
 * const largeArray = Array.from({ length: 100000 }, (_, i) => ({ id: i % 1000, value: `Item ${i}` }));
 * const uniqueItems = [...uniqByGenerator(largeArray, item => item.id)];
 * console.log(uniqueItems.length); // 출력: 1000
 *
 * @example
 * // 스트리밍 방식으로 처리
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 1, name: 'John' },
 *   { id: 3, name: 'Bob' },
 *   { id: 2, name: 'Jane' }
 * ];
 * for (const uniqueUser of uniqByGenerator(users, user => user.id)) {
 *   console.log(uniqueUser);
 * }
 */
export function* uniqByGenerator<T, K>(array: T[], keyExtractor: (item: T) => K): IterableIterator<T> {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    if (typeof keyExtractor !== 'function') {
        throw new Error('keyExtractor must be a function');
    }

    const seen = new Set<K>();

    for (const item of array) {
        const key = keyExtractor(item);

        if (!seen.has(key)) {
            seen.add(key);
            yield item;
        }
    }
}
