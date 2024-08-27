/**
 * 비교 유형을 나타내는 열거형
 */
export enum EqualityType {
    Shallow = 'shallow',
    Deep = 'deep',
}

/**
 * 두 값의 동등성을 비교합니다.
 *
 * @param value1 - 비교할 첫 번째 값
 * @param value2 - 비교할 두 번째 값
 * @param type - 비교 유형 (shallow 또는 deep)
 * @returns 두 값이 동등하면 true, 그렇지 않으면 false
 *
 * @example
 * console.log(equal({ a: 1, b: 2 }, { a: 1, b: 2 }, EqualityType.Shallow)); // true
 * console.log(equal({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }, EqualityType.Deep)); // true
 * console.log(equal(new Map([['a', 1], ['b', 2]]), new Map([['a', 1], ['b', 2]]), EqualityType.Shallow)); // true
 * console.log(equal(new Set([1, 2, 3]), new Set([1, 2, 3]), EqualityType.Deep)); // true
 *
 * @category Object - Comparison
 */
export function equal(value1: any, value2: any, type: EqualityType = EqualityType.Shallow): boolean {
    if (type === EqualityType.Shallow) {
        return shallowEqual(value1, value2);
    } else {
        return deepEqual(value1, value2);
    }
}

export function shallowEqual(value1: any, value2: any): boolean {
    if (Object.is(value1, value2)) {
        return true;
    }

    if (typeof value1 !== 'object' || value1 === null || typeof value2 !== 'object' || value2 === null) {
        return false;
    }

    if (value1 instanceof Map && value2 instanceof Map) {
        if (value1.size !== value2.size) return false;
        for (const [key, val] of value1) {
            if (!value2.has(key) || !Object.is(val, value2.get(key))) {
                return false;
            }
        }
        return true;
    }

    if (value1 instanceof Set && value2 instanceof Set) {
        if (value1.size !== value2.size) return false;
        for (const item of value1) {
            if (!value2.has(item)) {
                return false;
            }
        }
        return true;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(value2, key) || !Object.is(value1[key], value2[key])) {
            return false;
        }
    }

    return true;
}

export function deepEqual(value1: any, value2: any): boolean {
    if (Object.is(value1, value2)) {
        return true;
    }

    if (typeof value1 !== typeof value2) {
        return false;
    }

    if (typeof value1 !== 'object' || value1 === null || value2 === null) {
        return false;
    }

    if (value1 instanceof Map && value2 instanceof Map) {
        if (value1.size !== value2.size) return false;
        for (const [key, val] of value1) {
            if (!value2.has(key) || !deepEqual(val, value2.get(key))) {
                return false;
            }
        }
        return true;
    }

    if (value1 instanceof Set && value2 instanceof Set) {
        if (value1.size !== value2.size) return false;
        for (const item of value1) {
            if (!setHasDeep(value2, item)) {
                return false;
            }
        }
        return true;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(value2, key) || !deepEqual(value1[key], value2[key])) {
            return false;
        }
    }

    return true;
}

function setHasDeep(set: Set<any>, value: any): boolean {
    for (const item of set) {
        if (deepEqual(item, value)) {
            return true;
        }
    }
    return false;
}
