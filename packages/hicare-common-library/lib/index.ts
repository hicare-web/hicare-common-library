import type { FormatArgs } from 'lib/types';

export { Code, code } from 'lib/constant/code';
export { CodeValue, codeValue } from 'lib/constant/codeValue';
export { ConsentCodeText } from 'lib/constant/text';
export { DateSortType } from 'lib/constant/type';
export {
    DateFormatUnit,
    CcmStatusUnit,
    HttpMethodUnit,
    PageRouteUnit,
    PageRefererUnit,
    TimeUnit,
    SignatureUnit,
    ServiceTypeUnit,
} from 'lib/constant/units';

export {
    allPass,
    isArray,
    isEmpty,
    isBoolean,
    isFunction,
    isError,
    isNullish,
    isNumber,
    isNumeric,
    isString,
    isIncludedIn,
    isObjectType,
} from 'lib/guard';

export {
    HicareDate,
    hicareDate,
    debounce,
    throttle,
    once,
    inRange,
    delay,
    sleep,
    chunk,
    slice,
    cloneDeep,
    filter,
    map,
    reduce,
    find,
    findIndex,
    flatMap,
    flatten,
    groupBy,
    listToTree,
    orderBy,
    uniqBy,
} from 'lib/utility';

// 문자열 포멧팅을 위한 전역 확장
import { format } from 'lib/string/format';

declare global {
    interface Number {
        toFormat(template: string, ...args: FormatArgs): string;
    }
}

Number.prototype.toFormat = function (this: number, template: string, ...args: FormatArgs): string {
    return format(template, this, ...args);
};

export { format };
export { stringCase, getPersonFullName } from 'lib/string';
