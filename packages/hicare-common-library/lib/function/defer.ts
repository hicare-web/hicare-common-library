// queueMicrotask 폴리필
if (typeof queueMicrotask !== 'function') {
    (window as any).queueMicrotask = function (callback: () => void) {
        Promise.resolve()
            .then(callback)
            .catch((e) =>
                setTimeout(() => {
                    throw e;
                }),
            ); // 에러를 전역으로 던집니다
    };
}

/**
 * 주어진 함수의 실행을 현재 실행 스택이 완료된 후로 지연시킵니다.
 *
 * @param func - 지연 실행할 함수
 * @param args - 함수에 전달할 인자들
 * @returns Promise 객체. 이 Promise는 지연 실행된 함수의 결과로 해결됩니다.
 * @signature
 *  defer<T extends (...args: any[]) => any>(
 *    func: T,
 *    ...args: Parameters<T>
 *  ): Promise<ReturnType<T>>
 * @example
 *  defer(() => console.log('Deferred execution'));
 *  console.log('Immediate execution');
 *  // 출력:
 *  // Immediate execution
 *  // Deferred execution
 *
 *  // 인자와 함께 사용
 *  const result = await defer((a, b) => a + b, 2, 3);
 *  console.log(result); // 출력: 5
 *
 *  // 에러 처리
 *  try {
 *    await defer(() => { throw new Error('Deferred error'); });
 *  } catch (error) {
 *    console.error(error.message); // 출력: Deferred error
 *  }
 * @category Function - Control
 */
export function defer<T extends (...args: any[]) => any>(func: T, ...args: Parameters<T>): Promise<ReturnType<T>> {
    return new Promise((resolve, reject) => {
        const deferFunc = () => {
            try {
                resolve(func(...args));
            } catch (error) {
                reject(error);
            }
        };

        if (typeof queueMicrotask === 'function') {
            queueMicrotask(deferFunc);
        } else {
            Promise.resolve().then(deferFunc);
        }
    });
}
