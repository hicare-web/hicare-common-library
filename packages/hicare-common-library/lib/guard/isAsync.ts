export function isAsync(value: any): value is Promise<any> {
    if (value == null) return false;
    if (typeof value !== 'function') return false;

    return (
        value.constructor.name === 'AsyncFunction' ||
        value[Symbol.toStringTag] === 'AsyncFunction' ||
        value instanceof Promise ||
        (value.then && typeof value.then === 'function')
    );
}
