import { bench } from 'vitest';
import rustFn from '@hicare-web/backend_napi';
import { MeasureDataString } from './data.js';
const base64String = Buffer.from(MeasureDataString).toString('base64');

bench('nodeJS string from base64', () => {
    Buffer.from(base64String, 'base64').toString('utf-8');
});

bench('RUST NAPI string from base64', () => {
    rustFn.fromBase64(base64String).toString('utf-8');
});
