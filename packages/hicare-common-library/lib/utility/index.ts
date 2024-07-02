import {
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
} from 'lib/utility/guard';

import { HicareDate } from './date';

import { debounce } from './debounce';
import { throttle } from './throttle';
import { once } from './once';

import { inRange } from './inRange';

export {
    // type guard
    allPass,
    isArray,
    isBoolean,
    isEmpty,
    isError,
    isFunction,
    isNullish,
    isNumber,
    isNumeric,
    isString,
    isObjectType,
    isIncludedIn,
    // date utility
    HicareDate as hicareDate,

    // function utility
    debounce,
    throttle,
    once,
    inRange,
};
