/**
 * 각 요소가 하나만 존재하는 새 배열을 반환하는 함수
 *
 *
 *  @param array - 중복요소를 삭제할 배열
 *  @signature
 *  uniqBy(array, keyFunction)
 *  @example
 *  uniqueBy(
 *  [{ n: 1 }, { n: 2 }, { n: 2 }, { n: 5 }, { n: 1 }, { n: 6 }, { n: 7 }],
 *    (obj) => obj.n,
 *    ) // => [{n: 1}, {n: 2}, {n: 5}, {n: 6}, {n: 7}]
 *  uniqueBy(
 *  [   { id: 12, title: 'test', name: 'jack', age: 26 },
 *   { id: 15, title: 'test4', name: 'han', age: 16 },
 *   { id: 12, title: 'duplicate', name: 'john', age: 30 },
 *  ], item=>item.id)
 *  // => [{ id: 12, title: 'test', name: 'jack', age: 26 }, { id: 15, title: 'test4', name: 'han', age: 16 }
 *  )
 *  @dataFirst
 *  @lazy
 *  @category Array
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
