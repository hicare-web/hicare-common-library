import { isNumber } from 'lib/guard/isNumber';

/**
 * 주어진 숫자가 지정된 범위 내에 있는지 확인하는 함수
 *
 * @param value - 확인할 숫자
 * @param start - 범위의 시작값
 * @param end - 범위의 끝값
 * @param options - 추가 옵션
 * @param [options.inclusive=true] - 범위의 포함 여부를 결정하는 옵션
 *   - true: 시작값과 끝값을 포함한 닫힌 구간 [start, end]를 검사합니다. (기본값)
 *   - false: 시작값과 끝값을 제외한 열린 구간 (start, end)를 검사합니다.
 * @returns 숫자가 지정된 범위 내에 있으면 true, 아니면 false 숫자가 아닌 경우 false를 반환합니다.
 * @signature
 *  isRange(value: number, start: number, end: number, options?: { inclusive?: boolean }): boolean
 * @example
 *  // 기본 사용 (inclusive: true)
 *  isRange(5, 1, 10) // => true
 *  isRange(1, 1, 10) // => true (시작값 포함)
 *  isRange(10, 1, 10) // => true (끝값 포함)
 *  isRange(0, 1, 10) // => false
 *  isRange(11, 1, 10) // => false
 *
 *  // exclusive 범위 (inclusive: false)
 *  isRange(5, 1, 10, { inclusive: false }) // => true
 *  isRange(1, 1, 10, { inclusive: false }) // => false (시작값 미포함)
 *  isRange(10, 1, 10, { inclusive: false }) // => false (끝값 미포함)
 *
 *  // start가 end보다 큰 경우 (자동으로 swap)
 *  isRange(5, 10, 1) // => true
 *
 *  // 소수점이 있는 경우
 *  isRange(1.5, 1, 2) // => true
 *  isRange(1.0, 1, 2, { inclusive: false }) // => false
 * @category Logic
 */
export function isRange(
    value: number,
    start: number,
    end: number,
    options: { inclusive?: boolean } = { inclusive: true },
): boolean {
    const { inclusive = true } = options;
    if (!isNumber(value) && !isNumber(start) && !isNumber(end)) {
        return false;
    }

    // start가 end보다 큰 경우 swap
    if (start > end) {
        [start, end] = [end, start];
    }

    if (inclusive) {
        return value >= start && value <= end;
    } else {
        return value > start && value < end;
    }
}

/**
 * isRange 함수의 별칭
 * 주어진 숫자가 지정된 범위 내에 있는지 확인하는 함수
 *
 * @param value - 확인할 숫자
 * @param start - 범위의 시작값
 * @param end - 범위의 끝값
 * @param options - 추가 옵션
 * @param [options.inclusive=true] - 범위의 포함 여부를 결정하는 옵션
 *   - true: 시작값과 끝값을 포함한 닫힌 구간 [start, end]를 검사합니다. (기본값)
 *   - false: 시작값과 끝값을 제외한 열린 구간 (start, end)를 검사합니다.
 * @returns 숫자가 지정된 범위 내에 있으면 true, 아니면 false 숫자가 아닌 경우 false를 반환합니다.
 * @signature
 *  isRange(value: number, start: number, end: number, options?: { inclusive?: boolean }): boolean
 * @example
 *  // 기본 사용 (inclusive: true)
 *  isRange(5, 1, 10) // => true
 *  isRange(1, 1, 10) // => true (시작값 포함)
 *  isRange(10, 1, 10) // => true (끝값 포함)
 *  isRange(0, 1, 10) // => false
 *  isRange(11, 1, 10) // => false
 *
 *  // exclusive 범위 (inclusive: false)
 *  isRange(5, 1, 10, { inclusive: false }) // => true
 *  isRange(1, 1, 10, { inclusive: false }) // => false (시작값 미포함)
 *  isRange(10, 1, 10, { inclusive: false }) // => false (끝값 미포함)
 *
 *  // start가 end보다 큰 경우 (자동으로 swap)
 *  isRange(5, 10, 1) // => true
 *
 *  // 소수점이 있는 경우
 *  isRange(1.5, 1, 2) // => true
 *  isRange(1.0, 1, 2, { inclusive: false }) // => false
 * @category Logic
 */
export const inRange = isRange;
