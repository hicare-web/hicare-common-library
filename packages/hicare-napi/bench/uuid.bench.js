import { v4 } from 'uuid';
import rustFn from '@hicare-web/backend_napi';
import { bench } from 'vitest';
function bufferToUuidString(buffer) {
    return [
        buffer.toString('hex', 0, 4),
        buffer.toString('hex', 4, 6),
        buffer.toString('hex', 6, 8),
        buffer.toString('hex', 8, 10),
        buffer.toString('hex', 10, 16),
    ].join('-');
}

bench('nodeJS uuid', () => {
    v4();
});

bench('RUST NAPI uuid', () => {
    rustFn.uuidV4();
});

bench('RUST NAPI uuid pure', () => {
    rustFn.uuidV4Pure();
});

bench('RUST NAPI uuid pure1', () => {
    rustFn.uuidV4Pure1();
});

bench('RUST NAPI uuid pure5', () => {
    rustFn.getUuid();
});
