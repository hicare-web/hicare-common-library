import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import type { Duration, DurationUnitType, DurationUnitsObjectType } from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import arraySupport from 'dayjs/plugin/arraySupport';
import objectSupport from 'dayjs/plugin/objectSupport';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

// @ts-ignore
import type plugin from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(arraySupport);
dayjs.extend(objectSupport);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

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
    timezoneList.add('Asia/Korea');
}

type CreateDurationParameters =
    | [units: DurationUnitsObjectType]
    | [time: number, unit?: DurationUnitType]
    | [ISO_8601: string];

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

    /**
     * 현재 시간을 가져옵니다.
     * @param { dayjs.ConfigType } params
     * @returns dayjs.Dayjs
     */
    now(params?:  dayjs.ConfigType) {
        return dayjs(params);
    }

    /**
     * 현재 시간을 타임존을 적용하여 가져옵니다.
     * @param { dayjs.ConfigType } params
     */
    nowTz(params?:  dayjs.ConfigType) {
        return dayjs(params).tz(HicareDate.timezone);
    }

    /**
     * 현재 시간을 UTC로 가져옵니다.
     * @param { dayjs.ConfigType } params
     * @returns dayjs.Dayjs
     */
    nowUTC(params?:  dayjs.ConfigType) {
        return dayjs(params).utc();
    }

    /**
     * 현재 시간을 타임존을 적용후 UTC를 재 적용하여 가져옵니다.
     * @param { dayjs.ConfigType } params
     *  @returns dayjs.Dayjs
     */
    nowTzUtc(params?:  dayjs.ConfigType) {
        return dayjs(params).tz(HicareDate.timezone).utc();
    }

    /**
     * duration 객체를 가져옵니다.
     * @returns Duration
     * @param { CreateDurationParameters } args
     */
    duration(...args: CreateDurationParameters):Duration {
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
     * 타임존을 설정합니다.
     * @param timezone
     * @returns boolean
     * @throws Error 타임존이 잘못된 경우
     */
    setTimeZone(timezone: string) {
        if (!timezoneList.has(timezone)) {
            throw new Error(`Invalid timezone ${timezone}`);
        }

        return true;
    }
}

const hicareDate = new HicareDate();

export default hicareDate;
