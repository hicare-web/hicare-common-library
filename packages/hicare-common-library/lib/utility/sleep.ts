/**
 * 지정된 시간 동안 실행을 일시 중지합니다.
 *
 * @param time - 일시 중지할 시간. 숫자(밀리초) 또는 문자열(시간 표현)로 지정할 수 있습니다.
 * @returns Promise 객체. 지정된 시간이 경과하면 해결됩니다.
 * @signature
 *  sleep(time: number | string): Promise<void>
 * @example
 *  // 숫자로 시간 지정 (밀리초)
 *  await sleep(1000); // 1초 대기
 *
 *  // 문자열로 시간 지정
 *  await sleep('1s');     // 1초 대기
 *  await sleep('500ms');  // 500밀리초 대기
 *  await sleep('1m');     // 1분 대기
 *  await sleep('2h');     // 2시간 대기
 *  await sleep('1d');     // 1일 대기
 *
 *  // 복합 시간 표현
 *  await sleep('1m 30s'); // 1분 30초 대기
 *  await sleep('2h 30m'); // 2시간 30분 대기
 * @category Function - Control
 */
export function sleep(time: number | string): Promise<void> {
    const ms = typeof time === 'string' ? parseTime(time) : time;
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 문자열로 표현된 시간을 밀리초로 변환합니다.
 *
 * @param time - 파싱할 시간 문자열
 * @returns 밀리초 단위의 시간
 */
function parseTime(time: string): number {
    const regex = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([a-z]*)/gi;
    let ms = 0;
    time.replace(regex, (_, n, unit) => {
        const num = parseFloat(n);
        switch (unit) {
            case 'years':
            case 'year':
            case 'y':
                ms += num * 31557600000;
                break;
            case 'weeks':
            case 'week':
            case 'w':
                ms += num * 604800000;
                break;
            case 'days':
            case 'day':
            case 'd':
                ms += num * 86400000;
                break;
            case 'hours':
            case 'hour':
            case 'h':
                ms += num * 3600000;
                break;
            case 'minutes':
            case 'minute':
            case 'min':
            case 'm':
                ms += num * 60000;
                break;
            case 'seconds':
            case 'second':
            case 'sec':
            case 's':
                ms += num * 1000;
                break;
            case 'milliseconds':
            case 'millisecond':
            case 'ms':
                ms += num;
                break;
            default:
                ms += num;
        }
        return '';
    });
    return ms;
}
