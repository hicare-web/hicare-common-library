import { bench } from 'vitest';
import rustFn from '@hicare-web/backend_napi';
import { MeasureDataString } from './data.js';
import  * as node_base64 from "./base64.js";
import { base64BenchOption } from "./benchOption.js";

const base64String = Buffer.from(MeasureDataString).toString('base64');
const base64Buf = Buffer.from(MeasureDataString);
bench('nodeJS string from base64', () => {
    node_base64.decodeBase64(base64String);
}, base64BenchOption);

bench('RUST NAPI string from base64', () => {
    rustFn.fromBase64(base64String);
}, base64BenchOption);
