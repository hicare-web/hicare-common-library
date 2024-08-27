/**
 * 주어진 함수를 단 한 번만 실행되도록 래핑합니다.
 * 이후의 호출은 첫 번째 호출의 결과를 반환합니다.
 *
 * @param func - 한 번만 실행할 함수
 * @returns 래핑된 함수
 * @signature
 *  once<T extends (...args: any[]) => any>(func: T): T
 * @example
 *  const initialize = once(() => {
 *    console.log('초기화 실행');
 *    return { status: 'initialized' };
 *  });
 *
 *  console.log(initialize()); // 출력: 초기화 실행, 반환: { status: 'initialized' }
 *  console.log(initialize()); // 출력: 없음, 반환: { status: 'initialized' }
 *  console.log(initialize()); // 출력: 없음, 반환: { status: 'initialized' }
 *
 *  // 비동기 함수 예제
 *  const fetchData = once(async () => {
 *    const response = await fetch('https://api.example.com/data');
 *    return response.json();
 *  });
 *
 *  await fetchData(); // 실제로 API를 호출
 *  await fetchData(); // 캐시된 결과 반환, API 호출 없음
 * @category Function - Control
 */
export function once<T extends (...args: any[]) => any>(func: T): T {
    let result: ReturnType<T>;
    let called = false;

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
        if (called) {
            return result;
        }
        called = true;
        result = func.apply(this, args);
        // 함수 참조를 제거하여 메모리 누수 방지
        (func as unknown) = null;
        return result;
    } as T;
}
