/**
 * 모든 함수가 주어진 데이터에 대해 true인지 확인하는 함수
 *
 * @param data - 확인할 변수
 * @param fns - 확인할 함수
 * @signature
 *  allPass(data, fns)
 * @example
 *  const isDivisibleBy3 = (x: number) => x % 3 === 0
 *  const isDivisibleBy4 = (x: number) => x % 4 === 0
 *  const fns = [isDivisibleBy3, isDivisibleBy4]
 *  allPass(12, fns) // => true
 *  allPass(8, fns) // => false
 * @dataFirst
 * @category Array
 */

export function allPass<T>(data: T, fns: Array<(data: T) => boolean>): boolean {
    return fns.every((fn) => fn(data));
}
