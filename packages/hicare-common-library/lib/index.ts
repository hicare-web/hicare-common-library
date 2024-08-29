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
    allP,
    allPass,
    allPassCurried,
    inRange,
    isArray,
    isArrayLike,
    isBoolean,
    isDate,
    isEmpty,
    isError,
    isFalsy,
    isFinite,
    isFunction,
    isIncludeIn,
    isInteger,
    isIterable,
    isMap,
    isNaN,
    isNullish,
    isNumber,
    isNumeric,
    isObject,
    isPlainObject,
    isPrimitive,
    isPromise,
    isRange,
    isRegExp,
    isSet,
    isString,
    isSymbol,
    isTruthy,
    isWeakMap,
    isWeakSet,
} from 'lib/guard';

export { debounce, defer, debounceWithCancle, throttle, throttleWithCancle, once, flow } from 'lib/function';

export {
    atob,
    base64Decode,
    base64Encode,
    btoa,
    chunk,
    clone,
    cloneDeep,
    deepEqual,
    delay,
    equal,
    filter,
    find,
    findIndex,
    flatMap,
    flatten,
    groupBy,
    HicareDate,
    hicareDate,
    listToTree,
    map,
    memoize,
    orderBy,
    random,
    reduce,
    shallowEqual,
    sleep,
    slice,
    stringToUint8Array,
    uint8ArrayToString,
    uniqBy,
    uuidv4,
    normalize,
    maxBy,
    minBy,
    meanBy,
    sumBy,
} from 'lib/utility';

export { get, has } from 'lib/object';

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
