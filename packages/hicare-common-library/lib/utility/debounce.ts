/**
 *
 * func를 정의된 밀리초 동안 함수 호출을 지연시키는 함수
 * 디바운스된 함수가 호출될 때마다 clearTimeout()을 사용하여 현재 보류 중인 시간 제한을 지우고 setTimeout()을 사용하여 최소 ms 밀리초가 경과할 때까지 함수 호출을 지연시키는 새 시간 제한을 만듭니다.
 *
 *
 * @param func // 호출을 지연시킬 함수
 * @param {number} // delay 지연시킬 밀리초 시간
 * @returns // 새로 디바운스 된 함수 반환
 * @signature debounce(func,delay)
 * @example
 *  const logMessage = debounce((message: string) => {
 *      console.log({message});
 *  }, 300);
 * const updateCount = debounce((count: number) => {
 *  console.log({count});
 * }, 500);
 * logMessage("Hello"); // 300ms 내에 추가 호출이 없으면 실행 ( 300ms 후에 Hello 출력)
 * logMessage("World"); // 이전 호출 취소, 새로운 300ms 타이머 시작 ( 300ms 후에 World 출력 )
 *
 * updateCount(1); // 500ms 내에 추가 호출이 없으면 실행 ( 500ms 후에 1 출력)
 * updateCount(2); // 이전 호출 취소, 새로운 500ms 타이머 시작 ( 500ms 후에 2 출력 )
 * updateCount(3); // 이전 호출 취소, 새로운 500ms 타이머 시작 ( 500ms 후에 3 출력 )
 *
 */

export function debounce<T extends any[]>(func: (...args: T) => void, delay: number): (...args: T) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null; // setTimeout 반환값 (예약된 함수 실행)

    return function (...args: T): void {
        if (timeout !== null) {
            // 이전에 설정된 타임아웃이 있다면 그 타임아웃을 제거 / 연속호출 방지
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            // 이전에 설정된 타임아웃이 없으면 delay로 지정된 시간이 지나고 함수 실행
            func(...args);
            timeout = null;
        }, delay);
    };
}
