/**
 *  'limit' 밀리초마다 최대 한 번만 `func`를 호출하는 스로틀링 함수
 *  func는 스로틀링 함수에 제공된 마지막 인수로 호출됩니다.
 *  이후 스로틀된 함수에 대한 호출은 마지막 `func` 호출의 결과를 반환합니다.
 *
 *
 *  @param {Function} func 지정시간마다 한 번만 실행할 함수
 * @param {number} [wait=0] 호출을 제한할 밀리초 단위의 시간
 * @returns {Function} 새로 스로틀링된 함수 반환
 * @example
 * // 스크롤 시 위치를 과도하게 업데이트하지 않도록 합니다.
 * jQuery(window).on('scroll', throttle(updatePosition, 100))
 *
 * // 클릭 이벤트가 발생할 때 renewToken을 호출하지만, 5분에 한 번 이상 호출하지 않습니다.
 * const throttled = throttle(renewToken, 300000, { 'trailing': false })
 * jQuery(element).on('click', throttled)
 */

export function throttle<T extends any[]>(func: (...args: T) => void, limit: number): (...args: T) => void {
    let lastFunc: ReturnType<typeof setTimeout> | null = null; // setTimeout 반환값 (예약된 함수 실행)
    let lastRun: number = 0; // 함수 마지막 실행 시간

    return (...args: T) => {
        const now = Date.now();

        if (now - lastRun >= limit || lastRun === 0) {
            // 제한 시간이 지났거나 첫 호출이면 함수 실행
            if (lastFunc) {
                // 기존에 예약된 실행이 있으면 취소
                clearTimeout(lastFunc);
                lastFunc = null;
            }
            func(...args);
            lastRun = now;
        } else if (!lastFunc) {
            // 기존에 예약된 실행이 없고
            // 제한 시간 내에 호출되었다면 함수 실행 새로 예약
            lastFunc = setTimeout(
                () => {
                    func(...args);
                    lastRun = now;
                    lastFunc = null;
                },
                limit - (now - lastRun),
            );
        }
        // 기존에 예약된 실행이 있으면 함수를 실행하거나 실행 예약하지 않음 / 아무것도 안 함
    };
}
