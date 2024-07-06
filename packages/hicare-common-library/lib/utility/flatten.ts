import { isArray, isEmpty } from 'lib/guard';
import type { IterableContainer } from 'lib/types';
import type { IsNumericLiteral } from 'type-fest';

const DEFAULT_DEPTH = 1;

export function flatten<T extends IterableContainer, Depth extends number = typeof DEFAULT_DEPTH>(
    data: ReadonlyArray<T>,
    depth?: IsNumericLiteral<Depth> extends true ? Depth : never,
): Array<T> {
    if (!isArray(data)) {
        return data as Array<T>;
    }
    if (!isEmpty(data)) {
        return data as Array<T>;
    }

    if (isEmpty(depth) || depth === DEFAULT_DEPTH) {
        return noDepthFlatten(data);
    }

    return depthFlatten(data, depth);
}

function noDepthFlatten<T extends IterableContainer>(data: ReadonlyArray<T>): Array<T> {
    const result: Array<T> = [];
    const length = data.length;
    let i = 0;
    let resultIndex = 0;

    while (i < length) {
        const value = data[i] as T;
        if (Array.isArray(value)) {
            const valueLength = value.length;
            let j = 0;
            while (j < valueLength) {
                result[resultIndex++] = value[j];
                j++;
            }
        } else {
            result[resultIndex++] = value;
        }
        i++;
    }

    return result;
}

function depthFlatten<T extends IterableContainer, Depth extends number = typeof DEFAULT_DEPTH>(
    data: ReadonlyArray<T>,
    depth: number = DEFAULT_DEPTH as Depth,
): Array<T> {
    const result: Array<T> = [];
    let i = 0;

    const stack = [] as { value: T; depth: number }[];
    // 초기 스택을 직접 채웁니다
    for (i = data.length - 1; i >= 0; i--) {
        stack.push({ value: data[i], depth });
    }

    while (stack.length > 0) {
        const currentDepthData = stack.pop();
        if (!currentDepthData) {
            continue;
        }

        const { value, depth: currentDepth } = currentDepthData;

        if (Array.isArray(value) && currentDepth > 0) {
            for (let i = value.length - 1; i >= 0; i--) {
                stack.push({ value: value[i], depth: currentDepth - 1 });
            }
        } else {
            result.push(value);
        }
    }

    return result;
}
