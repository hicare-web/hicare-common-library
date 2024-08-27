import { allPass, allPassCurried, allP } from 'lib/guard/allPass';
import { isArray, isArrayLike, isIterable } from 'lib/guard/isArray';
import { isBoolean } from 'lib/guard/isBoolean';
import { isEmpty } from 'lib/guard/isEmpty';
import { isError } from 'lib/guard/isError';
import { isFunction } from 'lib/guard/isFunction';
import { isNullish } from 'lib/guard/isNullish';
import { isNumber, isInteger } from 'lib/guard/isNumber';
import { isNumeric } from 'lib/guard/isNumeric';
import { isString } from 'lib/guard/isString';
import { isObject, isPlainObject } from 'lib/guard/isObject';
import { isNaN } from 'lib/guard/isNaN';
import { isFinite } from 'lib/guard/isFinite';
import { isSymbol } from 'lib/guard/isSymbol';
import { isPrimitive } from 'lib/guard/isPrimitive';
import { isDate } from 'lib/guard/isDate';
import { isRegExp } from 'lib/guard/isRegExp';
import { isPromise } from 'lib/guard/isPromise';
import { isMap, isSet, isWeakMap, isWeakSet } from 'lib/guard/isCollection';
import { isFalsy, isTruthy } from 'lib/guard/isLogical';
import { isIncludeIn } from 'lib/guard/isIncludeIn';
import { isRange, inRange } from 'lib/guard/isRange';

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
