/**
 * `start`와 `end` 사이에 value가 있는지 확인하지만 `end`의 값이 없는경우는 포함하지 않습니다.
 * 'end'가 undefined일 경우, 숫자는 0부터 'start'까지, 날짜는 1970년 1월 1일부터 'start'까지의 범위로 간주합니다.
 * 'start'가 'end'보다 큰 경우 'end'에서 'start'사이의 범위로 변경됩니다.
 *
 * @template T
 * @param {T} value 확인할 변수 (숫자 또는 Date 객체)
 * @param {T} start 시작 변수 (숫자 또는 Date 객체)
 * @param {T} [end] 끝 변수 (숫자 또는 Date 객체, 옵션)
 * @returns {boolean} start <= value < end 이라면 true, 아니면 false 반환
 * @throws {Error} value의 타입과 start, end의 타입이 일치하지 않을 경우 에러를 발생시킵니다.
 *
 * @example
 * // 숫자 사용 예시
 * inRange(3, 2, 4) // => true
 * inRange(4, 8) // => true
 * inRange(1.2, 2) // => true
 * inRange(-3, -2, -6) // => true
 * inRange(4, 2) // => false
 * inRange(2, 2) // => false
 *
 * @example
 * // Date 객체 사용 예시
 * inRange(new Date('2023-01-15'), new Date('2023-01-01'), new Date('2023-01-31')) // => true
 * inRange(new Date('2023-02-01'), new Date('2023-01-01')) // => false
 */
export function inRange<T>(value: T, start: number, end?: number): boolean;
export function inRange<T>(value: T, start: Date, end?: Date): boolean;
export function inRange<T>(value: T, start: number | Date, end?: number | Date): boolean {
    if (!isSameType(value, start, end)) {
        if (end) {
            throw new Error('value의 타입과 start, end의 타입이 같아야 합니다.');
        } else {
            throw new Error('value의 타입과 start의 타입이 같아야 합니다.');
        }
    }

    if (typeof value === 'number') {
        return inRangeForNumber(value, start as number, end as number);
    } else if (value instanceof Date) {
        return inRangeForDate(value, start as Date, end as Date);
    }

    return false;
}

function inRangeForNumber(value: number, start: number, end?: number): boolean {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    if (start > end) {
        [start, end] = [end, start];
    }

    return value >= start && value < end;
}

function inRangeForDate(value: Date, start: Date, end?: Date): boolean {
    if (end === undefined) {
        end = start;
        start = new Date(0);
    }

    if (start > end) {
        [start, end] = [end, start];
    }

    return value >= start && value < end;
}

function isSameType<T extends number | Date>(value: unknown, start: unknown, end: unknown | undefined): value is T {
    if (typeof value === 'number' && typeof start === 'number' && (end === undefined || typeof end === 'number')) {
        return true;
    }
    if (value instanceof Date && start instanceof Date && (end === undefined || end instanceof Date)) {
        return true;
    }
    return false;
}
