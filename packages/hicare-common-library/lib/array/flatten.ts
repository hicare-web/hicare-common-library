import { isArray, isEmpty } from 'lib/guard';

const DEFAULT_DEPTH = 1;
type NestedArray<T> = Array<T | NestedArray<T>>;

export function flatten<T>(array: NestedArray<T>, depth: number = DEFAULT_DEPTH): T[] {
    if (!isArray(array)) {
        return array as Array<T>;
    }
    if (!isEmpty(array)) {
        return array as Array<T>;
    }

    return flatWithDepth(array, depth);
}

function flatWithDepth<T>(array: NestedArray<T>, depth: number): T[] {
    const result: T[] = [];
    const stack: [NestedArray<T>, number][] = [[array, depth]];

    while (stack.length > 0) {
        const [currentArray, currentDepth] = stack.pop()!;

        for (let i = 0; i < currentArray.length; i++) {
            const currentItem = currentArray[i];

            if (Array.isArray(currentItem) && currentDepth > 0) {
                stack.push([currentItem, currentDepth - 1]);
            } else if (currentItem !== undefined) {
                result.push(currentItem as T);
            }
        }
    }

    return result;
}
