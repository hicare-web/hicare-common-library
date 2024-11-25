import { allP, allPass, allPassCurried } from 'lib/guard/allPass';
import { isArray, isArrayLike, isIterable } from 'lib/guard/isArray';
import { isBoolean } from 'lib/guard/isBoolean';
import { isMap, isSet, isWeakMap, isWeakSet } from 'lib/guard/isCollection';
import { isDate } from 'lib/guard/isDate';
import { isEmpty } from 'lib/guard/isEmpty';
import { isError } from 'lib/guard/isError';
import { isFinite } from 'lib/guard/isFinite';
import { isFunction } from 'lib/guard/isFunction';
import { isIncludeIn } from 'lib/guard/isIncludeIn';
import { isFalsy, isTruthy } from 'lib/guard/isLogical';
import { isNaN } from 'lib/guard/isNaN';
import { isNullish } from 'lib/guard/isNullish';
import { isInteger, isNumber } from 'lib/guard/isNumber';
import { isNumeric } from 'lib/guard/isNumeric';
import { isObject, isPlainObject } from 'lib/guard/isObject';
import { isPrimitive } from 'lib/guard/isPrimitive';
import { isPromise } from 'lib/guard/isPromise';
import { inRange, isRange } from 'lib/guard/isRange';
import { isRegExp } from 'lib/guard/isRegExp';
import { isString } from 'lib/guard/isString';
import { isSymbol } from 'lib/guard/isSymbol';

export {
    allPass,
    allPassCurried,
    allP,
    isArray,
    isArrayLike,
    isIterable,
    isBoolean,
    isEmpty,
    isError,
    isFunction,
    isNullish,
    isNumber,
    isInteger,
    isNumeric,
    isString,
    isObject,
    isPlainObject,
    isNaN,
    isFinite,
    isSymbol,
    isPrimitive,
    isDate,
    isRegExp,
    isPromise,
    isMap,
    isSet,
    isWeakMap,
    isWeakSet,
    isFalsy,
    isTruthy,
    isRange,
    inRange,
    isIncludeIn,
};
