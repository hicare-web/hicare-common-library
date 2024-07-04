import { cloneDeep } from '../cloneDeep';

export const cloneNestedArrays = (value: any): any => {
    let result: any[] = [];
    for (const iterator of value) {
        if (Array.isArray(iterator)) {
            result.push(cloneDeep(iterator));
        } else {
            result.push(iterator);
        }
    }
    return result;
};
