/**
 *  `start`와 `end` 사이에 value가 있는지 확인하지만 `end`는 포함하지 않습니다
 *  'end'가 undefined일 경우, 0부터 'start'까지의 범위로 간주합니다
 *  'start'가 'end'보다 큰 경우 'end'에서 'start'사이의 범위로 변경됩니다
 *
 * @param value 확인할 변수
 * @param start 시작 변수
 * @param end 끝 변수
 * @returns {boolean} start =<value <end 이라면 true, 아니면 false 반환
 * @example
 *
 *  inRange(3, 2, 4) // => true
 *  inRange(4, 8) // => true
 *  inRange(1.2, 2) // => true
 *  inRange(-3, -2, -6) // => true
 *
 *  inRange(4, 2) // => false
 *  inRange(2, 2) // => false
 *
 */

export function inRange<T>(value: T, start: number, end?: number): boolean;
export function inRange<T>(value: T, start: Date, end?: Date): boolean;
export function inRange<T>(value: T, start: number | Date, end?: number | Date): boolean {
    if (typeof value === 'number') {
        if (end === undefined) {
            end = start;
            start = 0;
        }
        return Number(value) >= Number(start) && Number(value) < Number(end);
    }
    if (value instanceof Date) {
        if (end === undefined) {
            end = start;
            start = new Date(0);
        }
        return +value >= +start && +value < +end;
    }
    end = end as number | Date;
    if (start > end) {
        [start, end] = [end, start];
    } else {
        return false;
    }
    return value >= start && value < end;
}
