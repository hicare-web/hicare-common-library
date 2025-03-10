import type { ConfigType, Dayjs, OptionType } from 'dayjs';
import dayjs from 'dayjs';
import arraySupport from 'dayjs/plugin/arraySupport';
import duration, { type Duration, type DurationUnitsObjectType, type DurationUnitType } from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import objectSupport from 'dayjs/plugin/objectSupport';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DateComparisonResult } from 'lib/types';

interface DateRange {
    startDate: string;
    endDate: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(arraySupport);
dayjs.extend(objectSupport);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export type {
    arraySupport,
    duration,
    isBetween,
    isSameOrAfter,
    isSameOrBefore,
    objectSupport,
    relativeTime,
    timezone,
    utc,
};

// @ts-ignore
const timezoneList = new Set<String>();

try {
    // @ts-ignore
    const _timezoneList = Intl.supportedValuesOf('timeZone');

    for (const timezone of _timezoneList) {
        timezoneList.add(timezone);
    }
} catch (e) {
    console.error(e);
    timezoneList.add('America/Los_Angeles');
    timezoneList.add('America/New_York');
    timezoneList.add('Asia/Seoul');
}

export type CreateDurationParameters =
    | [units: DurationUnitsObjectType]
    | [time: number, unit?: DurationUnitType]
    | [ISO_8601: string];

export type HicareDateType = Dayjs;
export type HicareDuration = Duration;
export type HicareConfigType = ConfigType;

export class HicareDate {
    static timezone: string = 'America/Los_Angeles';

    /** 밀리세컨드 */
    static milliseconds = dayjs.duration(1, 'millisecond').asMilliseconds();

    /** 초 (단위 밀리세컨드) */
    static seconds = dayjs.duration(1, 'second').asMilliseconds();

    /** 분 (단위 밀리세컨드) */
    static minutes = dayjs.duration(1, 'minute').asMilliseconds();

    /** 시간 (단위 밀리세컨드) */
    static hours = dayjs.duration(1, 'hour').asMilliseconds();

    /** 일 (단위 밀리세컨드) */
    static days = dayjs.duration(1, 'day').asMilliseconds();

    /** 주 (단위 밀리세컨드) */
    static weeks = dayjs.duration(1, 'week').asMilliseconds();

    /** 월 (단위 밀리세컨드) */
    static months = dayjs.duration(1, 'month').asMilliseconds();

    /** 년 (단위 밀리세컨드) */
    static years = dayjs.duration(1, 'year').asMilliseconds();

    constructor(timezone?: string) {
        try {
            dayjs().tz(timezone); // 올바른 타임존인지 검증용
            if (timezone) {
                HicareDate.timezone = timezone;
            }
        } catch (e) {
            HicareDate.timezone = 'America/Los_Angeles';
        }
    }

    /**
     * dayjs 객체를 가져옵니다.
     * @param { HicareConfigType } params
     * @param { OptionType } format
     * @param { string } locale
     * @param { boolean } strict
     * @returns HicareDateType
     */
    dayjs(params?: HicareConfigType, format?: OptionType, locale?: string, strict?: boolean): HicareDateType {
        return dayjs(params, format, locale, strict);
    }

    tz(): string {
        return HicareDate.timezone;
    }
    /**
     * 현재 시간을 가져옵니다.
     * @param { HicareConfigType } params
     * @param { OptionType } format
     * @param { string } locale
     * @param { boolean } strict
     * @returns HicareDateType
     * @deprecated 2.0.0 instead use hicareDate.dayjs()
     */
    now(params?: HicareConfigType, format?: OptionType, locale?: string, strict?: boolean): HicareDateType {
        return dayjs(params, format, locale, strict);
    }

    /**
     * 현재 시간을 타임존을 적용하여 가져옵니다.
     * @param { HicareConfigType } params
     * @param { OptionType } format
     * @param { string } locale
     * @param { boolean } strict
     */
    nowTz(params?: HicareConfigType, format?: OptionType, locale?: string, strict?: boolean): HicareDateType {
        return dayjs(params, format, locale, strict).tz(HicareDate.timezone);
    }

    /**
     * 현재 시간을 UTC로 가져옵니다.
     * @param { HicareConfigType } params
     * @param { OptionType } format
     * @param { string } locale
     * @param { boolean } strict
     * @returns HicareDateType
     */
    nowUTC(params?: HicareConfigType, format?: OptionType, locale?: string, strict?: boolean): HicareDateType {
        return dayjs(params, format, locale, strict).utc();
    }

    /**
     * 현재 시간을 타임존을 적용후 UTC를 재 적용하여 가져옵니다.
     * @param { HicareConfigType } params
     * @param { OptionType } format
     * @param { string } locale
     * @param { boolean } strict
     *  @returns HicareDateType
     *  @deprecated 2.0.0 instead use nowTz
     */
    nowTzUtc(params?: HicareConfigType, format?: OptionType, locale?: string, strict?: boolean): HicareDateType {
        return dayjs(params, format, locale, strict).tz(HicareDate.timezone).utc();
    }

    /**
     * 입력된 날짜를 UTC 기준 형식화된 문자열로 변환합니다.
     * @param {HicareConfigType} date 변환할 날짜 (string | Date)
     * @param { OptionType } format
     * @param { string } locale
     * @param { boolean } strict
     * @returns {string} 'YYYY-MM-DD HH:mm:ss' 형식
     */
    formatToUTC(date: HicareConfigType, format?: OptionType, locale?: string, strict?: boolean): string {
        return dayjs(date, format, locale, strict).utc().format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * 일 단위 범위를 계산합니다. date는 timezone 기준날짜입니다. utc기준의 시간이 아닙니다.
     * @param {HicareConfigType} date 기준 날짜
     * @returns {DateRange} DateRange 해당 일의 시작과 끝
     *
     * @Example 한국시간 1 - hicareDate.setTimeZone('Asia/Seoul').getDayRange('2022-02-01') - 2022-01-31 15:00:00 ~ 2022-02-01 14:59:59
     * @Example 한국시간 2- hicareDate.setTimeZone('Asia/Seoul').getDayRange('2022-02-01 12:00:00') - 2022-01-31 15:00:00 ~ 2022-02-01 14:59:59
     * @Example 미국시간 서머타임 전 1 - hicareDate.setTimeZone('America/Los_Angeles').getDayRange('2022-02-01') - 2022-01-31 08:00:00 ~ 2022-02-01 07:59:59
     * @Example 미국시간 서머타임 전 2 - hicareDate.setTimeZone('America/Los_Angeles').getDayRange('2022-02-01 12:00:00') - 2022-01-31 08:00:00 ~ 2022-02-01 07:59:59
     * @Example 미국시간 서머타임 후 1 - hicareDate.setTimeZone('America/Los_Angeles').getDayRange('2022-06-01') - 2022-05-31 07:00:00 ~ 2022-06-01 06:59:59
     * @Example 미국시간 서머타임 후 2 - hicareDate.setTimeZone('America/Los_Angeles').getDayRange('2022-06-01 12:00:00') - 2022-05-31 07:00:00 ~ 2022-06-01 06:59:59
     */
    getDayRange(date: HicareConfigType): DateRange {
        const _date = dayjs.tz(date, HicareDate.timezone);
        return {
            startDate: _date.startOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
            endDate: _date.endOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
        };
    }

    /**
     * 주 단위 범위를 계산합니다. date는 timezone 기준날짜입니다. utc기준의 시간이 아닙니다.
     * @param {HicareConfigType} date 기준 날짜
     * @returns {DateRange} DateRange 해당 주의 시작과 끝
     * @Example 한국시간 1 - hicareDate.setTimeZone('Asia/Seoul').getWeekRange('2022-02-01') - 2022-01-29 15:00:00 ~ 2022-02-05 14:59:59
     * @Example 한국시간 2 - hicareDate.setTimeZone('Asia/Seoul').getWeekRange('2022-02-01 12:00:00') - 2022-01-29 15:00:00 ~ 2022-02-05 14:59:59
     * @Example 미국시간 서머타임 전 1 - hicareDate.setTimeZone('America/Los_Angeles').getWeekRange('2022-02-01') - 2022-01-30 08:00:00 ~ 2022-02-06 07:59:59
     * @Example 미국시간 서머타임 전 2 - hicareDate.setTimeZone('America/Los_Angeles').getWeekRange('2022-02-01 12:00:00') - 2022-01-30 08:00:00 ~ 2022-02-06 07:59:59
     * @Example 미국시간 서머타임 후 1 - hicareDate.setTimeZone('America/Los_Angeles').getWeekRange('2022-06-01') - 2022-05-29 07:00:00 ~ 2022-06-05 06:59:59
     * @Example 미국시간 서머타임 후 2 - hicareDate.setTimeZone('America/Los_Angeles').getWeekRange('2022-06-01 12:00:00') - 2022-05-29 07:00:00 ~ 2022-06-05 06:59:59
     */
    getWeekRange(date: HicareConfigType): DateRange {
        const _date = dayjs.tz(date, HicareDate.timezone);
        return {
            startDate: _date.startOf('week').utc().format('YYYY-MM-DD HH:mm:ss'),
            endDate: _date.endOf('week').utc().format('YYYY-MM-DD HH:mm:ss'),
        };
    }

    /**
     * 월 단위 범위를 계산합니다. date는 timezone 기준날짜입니다. utc기준의 시간이 아닙니다.
     * @param {HicareConfigType} date 기준 날짜
     * @returns {DateRange} DateRange 해당 월의 시작과 끝
     * @Example 한국시간 1 - hicareDate.setTimeZone('Asia/Seoul').getMonthRange('2022-02-01') - 2022-01-31 15:00:00 ~ 2022-02-28 14:59:59
     * @Example 한국시간 2 - hicareDate.setTimeZone('Asia/Seoul').getMonthRange('2022-02-01 12:00:00') - 2022-01-31 15:00:00 ~ 2022-02-28 14:59:59
     * @Example 미국시간 서머타임 전 1 - hicareDate.setTimeZone('America/Los_Angeles').getMonthRange('2022-02-01') - 2022-02-01 08:00:00 ~ 2022-03-01 07:59:59
     * @Example 미국시간 서머타임 전 2 - hicareDate.setTimeZone('America/Los_Angeles').getMonthRange('2022-02-01 12:00:00') - 2022-02-01 08:00:00 ~ 2022-03-01 07:59:59
     * @Example 미국시간 서머타임 후 1 - hicareDate.setTimeZone('America/Los_Angeles').getMonthRange('2022-06-01') - 2022-06-01 07:00:00 ~ 2022-07-01 06:59:59
     * @Example 미국시간 서머타임 후 2 - hicareDate.setTimeZone('America/Los_Angeles').getMonthRange('2022-06-01 12:00:00') - 2022-06-01 07:00:00 ~ 2022-07-01 06:59:59
     */
    getMonthRange(date: HicareConfigType): DateRange {
        const _date = dayjs.tz(date, HicareDate.timezone);
        return {
            startDate: _date.startOf('month').utc().format('YYYY-MM-DD HH:mm:ss'),
            endDate: _date.endOf('month').utc().format('YYYY-MM-DD HH:mm:ss'),
        };
    }

    /**
     * 커스텀 범위를 계산합니다.
     * @param {HicareConfigType} date 기준 날짜
     * @param {'day' | 'week' | 'month' } unit 단위 ('day' | 'week' | 'month')
     * @returns {DateRange} DateRange 해당 단위의 시작과 끝
     */
    getDateRange(date: HicareConfigType, unit: 'day' | 'week' | 'month'): DateRange {
        switch (unit) {
            case 'day':
                return this.getDayRange(date);
            case 'week':
                return this.getWeekRange(date);
            case 'month':
                return this.getMonthRange(date);
            default:
                throw new Error(`Invalid unit: ${unit}`);
        }
    }

    /**
     * duration 객체를 가져옵니다.
     * @returns hicareDuration
     * @param { CreateDurationParameters } args
     *
     * example 1: hicareDate.duration(1, 'day')
     * example 2: hicareDate.duration(1, 'hour')
     * example 3 (get return seconds): hicareDate.duration(1, 'hour').asSeconds()
     */
    duration(...args: CreateDurationParameters): HicareDuration {
        if (args.length === 1) {
            if (typeof args[0] === 'object') {
                return dayjs.duration(args[0]);
            } else if (typeof args[0] === 'string') {
                return dayjs.duration(args[0]);
            } else {
                return dayjs.duration(args[0]);
            }
        } else {
            return dayjs.duration(args[0] as number, args[1] as DurationUnitType);
        }
    }

    /**
     * 두 날짜를 비교하여 정렬에 사용될 값을 반환합니다.
     * @param {HicareConfigType} firstDate 첫 번째 날짜
     * @param {HicareConfigType} secondDate 두 번째 날짜
     * @returns {DateComparisonResult} 첫 번째 날짜가 더 늦으면 AFTER, 같으면 EQUAL, 더 이르면 BEFORE를 반환합니다.
     */
    compareDates(firstDate: HicareConfigType, secondDate: HicareConfigType): DateComparisonResult {
        const diff = dayjs(firstDate).valueOf() - dayjs(secondDate).valueOf();
        return diff > 0
            ? DateComparisonResult.AFTER
            : diff < 0
              ? DateComparisonResult.BEFORE
              : DateComparisonResult.EQUAL;
    }

    /**
     * 타임존을 설정합니다.
     * @param {string} timezone
     * @returns boolean
     * @throws Error 타임존이 잘못된 경우
     */
    setTimeZone(timezone: string) {
        if (!timezoneList.has(timezone)) {
            throw new Error(`Invalid timezone ${timezone}`);
        }

        HicareDate.timezone = timezone;
        return this;
    }
}

const hicareDate = new HicareDate();

export default hicareDate;
