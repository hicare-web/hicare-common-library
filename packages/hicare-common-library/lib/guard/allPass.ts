/**
 * 주어진 데이터에 대해 모든 함수가 true를 반환하는지 확인하는 함수
 *
 * @param data - 검사할 데이터
 * @param predicates - 검사할 함수들의 배열
 * @returns 모든 함수가 true를 반환하면 true, 그렇지 않으면 false
 * @signature
 *  allPass(data, predicates)
 * @example
 *  const isEven = (n: number) => n % 2 === 0
 *  const isPositive = (n: number) => n > 0
 *
 *  allPass(4, [isEven, isPositive]) // => true
 *  allPass(3, [isEven, isPositive]) // => false
 *  allPass(-2, [isEven, isPositive]) // => false
 *
 * @category Logic
 */
export function allPass<T>(data: T, predicates: Array<(data: T) => boolean>): boolean {
    return predicates.every((predicate) => predicate(data));
}

/**
 * allPass 함수의 curried 버전
 *
 * @param predicates - 검사할 함수들의 배열
 * @returns 데이터를 받아 모든 함수가 true를 반환하는지 확인하는 함수
 * @signature
 *  allPassCurried(predicates)(data)
 * @example
 *  const isEvenAndPositive = allPassCurried([
 *    (n: number) => n % 2 === 0,
 *    (n: number) => n > 0
 *  ]);
 *
 *  isEvenAndPositive(4) // => true
 *  isEvenAndPositive(3) // => false
 *  isEvenAndPositive(-2) // => false
 *
 * @category Logic
 */
export function allPassCurried<T>(predicates: Array<(data: T) => boolean>): (data: T) => boolean {
    return (data: T) => predicates.every((predicate) => predicate(data));
}

/**
 * allPassCurried 함수의 별칭
 *
 * 이 함수는 allPassCurried와 동일하지만 더 짧은 이름을 제공합니다.
 *
 * @param predicates - 검사할 함수들의 배열
 * @returns 데이터를 받아 모든 함수가 true를 반환하는지 확인하는 함수
 * @signature
 *  allP(predicates)(data)
 * @example
 *  const isEvenAndPositive = allP([
 *    (n: number) => n % 2 === 0,
 *    (n: number) => n > 0
 *  ]);
 *
 *  isEvenAndPositive(4) // => true
 *  isEvenAndPositive(3) // => false
 *  isEvenAndPositive(-2) // => false
 *
 * @category Logic
 */
export const allP = allPassCurried;
