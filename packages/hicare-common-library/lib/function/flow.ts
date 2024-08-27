/**
 * 여러 함수를 조합하여 새로운 함수를 만듭니다. 함수들은 왼쪽에서 오른쪽으로 실행됩니다.
 *
 * @param fns - 조합할 함수들
 * @returns 조합된 함수
 * @signature
 *  flow<T>(...fns: Array<(arg: T) => T>): (arg: T) => T
 * @example
 *  const addOne = (x: number) => x + 1;
 *  const double = (x: number) => x * 2;
 *  const doubleAfterAddOne = flow(addOne, double);
 *  doubleAfterAddOne(3) // => 8
 * @category Function - Composition
 */
export function flow<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
    const length = fns.length;

    return function (result) {
        for (let i = 0; i < length; i++) {
            result = fns[i](result);
        }
        return result;
    };
}

/**
 * 여러 함수를 파이프라인으로 연결하여 새로운 함수를 만듭니다. 함수들은 왼쪽에서 오른쪽으로 실행됩니다.
 *
 * @param fns - 파이프라인으로 연결할 함수들
 * @returns 파이프라인으로 연결된 함수
 * @signature
 *  pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T
 * @example
 *  const addOne = (x: number) => x + 1;
 *  const double = (x: number) => x * 2;
 *  const doubleAfterAddOne = pipe(addOne, double);
 *  doubleAfterAddOne(3) // => 8
 * @category Function - Composition
 */
export const pipe = flow;
