import { bench } from 'vitest';
import rustFn from '@hicare-web/backend_napi';
import { MeasureDataString } from './data.js';
bench('nodeJS string to base64', () => {
    Buffer.from(MeasureDataString).toString('base64');
});

const bufferBase64 = Buffer.from(MeasureDataString);
bench('RUST NAPI string to base64', () => {
    rustFn.toBase64(bufferBase64);
});
