import type { NarrowedTo } from 'lib/types';

export function isObjectType<T>(data: T | object): data is NarrowedTo<T, object> {
    return typeof data === 'object' && data !== null;
}
