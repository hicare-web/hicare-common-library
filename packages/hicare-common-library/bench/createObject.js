const randomValueLength = 100000;
const randomValueList = new Set();
const emailVendorList = ['gmail.com', 'yahoo.com', 'hotmail.com'];
const statusList = ['active', 'inactive', 'pending', 'deleted'];
const objectKeyList = [
    'comment',
    'updatedAt',
    'email',
    'name',
    'password',
    'title',
    'id',
    'value',
    'token',
    'category',
    'Cerium',
    'Gallium',
    'Manganese',
    'Gold',
    'Antimony',
    'Titanium',
    'Aluminium',
    'Krypton',
    'Hassium',
    'Copper',
    'Copernicium',
];

const objectChildKeyList = [
    'name',
    'value',
    'category',
    'status',
    'avatar',
    'createdAt',
    'comment',
    'email',
    'title',
    'updatedAt',
    'token',
    'group',
    'Holmium',
    'Tantalum',
    'Copernicium',
    'Selenium',
    'Oganesson',
    'Carbon',
    'Actinium',
    'Nobelium',
    'Lutetium',
    'Molybdenum',
    'Palladium',
    'Antimony',
    'Tungsten',
    'Zinc',
    'Barium',
    'Technetium',
    'Thallium',
    'Francium',
    'Flerovium',
];

for (let i = 0; i < randomValueLength; i++) {
    randomValueList.add(randomNumber(0, randomValueLength * 1000));
}

/**
 *
 * @param {number} length
 * @returns {string}
 */
export function randomString(length) {
    return Math.random()
        .toString(36)
        .substring(2, length + 2);
}

/**
 * @param {number} min
 * @param {number} max
 */

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @param {number} length
 * @returns {Object}
 */
export function generatorRandomObject(length) {
    const obj = {};
    for (let i = 0; i < length; i++) {
        const randomKey = objectKeyList[Math.floor(Math.random() * objectKeyList.length)];
        if (!obj['id']) {
            obj['id'] = generatorRandomObjectChild(10);
            continue;
        }
        if (!obj['value']) {
            obj['value'] = Math.floor(Math.random() * randomValueLength);
            continue;
        }

        if (obj[randomKey]) {
            i--;
            continue;
        }

        if (randomKey.indexOf('At') > -1) {
            obj[randomKey] = new Date().toISOString();
            continue;
        }

        if (randomKey === 'email') {
            obj[randomKey] =
                `${randomString(10)}@${emailVendorList[Math.floor(Math.random() * emailVendorList.length)]}`;
            continue;
        }

        if (randomKey === 'status') {
            obj[randomKey] = statusList[Math.floor(Math.random() * statusList.length)];
            continue;
        }

        obj[randomKey] = generatorRandomObjectChild(10);
    }
    return obj;
}

/**
 * @param {number} length
 * @returns {Object}
 */
export function generatorRandomObjectChild(length) {
    const obj = {};
    for (let i = 0; i < length; i++) {
        const randomKey = objectChildKeyList[Math.floor(Math.random() * objectChildKeyList.length)];
        if (!obj['value']) {
            obj['value'] = Math.floor(Math.random() * randomValueLength);
            continue;
        }

        if (obj[randomKey]) {
            i--;
            continue;
        }

        if (randomKey.indexOf('At') > -1) {
            obj[randomKey] = new Date().toISOString();
            continue;
        }

        if (randomKey === 'email') {
            obj[randomKey] =
                `${randomString(10)}@${emailVendorList[Math.floor(Math.random() * emailVendorList.length)]}`;
            continue;
        }

        if (randomKey === 'status') {
            obj[randomKey] = statusList[Math.floor(Math.random() * statusList.length)];
            continue;
        }

        obj[randomKey] = randomString(50);
    }
    return obj;
}
