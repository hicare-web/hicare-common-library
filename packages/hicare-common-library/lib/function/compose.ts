/**
 * 여러 함수를 조합하여 새로운 함수를 만듭니다. 함수들은 오른쪽에서 왼쪽으로 실행됩니다.
 *
 * @param fns - 조합할 함수들
 * @returns 조합된 함수
 * @signature
 *  compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T
 * @example
 *  const addOne = (x: number) => x + 1;
 *  const double = (x: number) => x * 2;
 *  const addOneThenDouble = compose(double, addOne);
 *  addOneThenDouble(3) // => 8
 * @category Function - Composition
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
    const length = fns.length;

    return function (result) {
        for (let i = length - 1; i >= 0; i--) {
            result = fns[i](result);
        }
        return result;
    };
}
