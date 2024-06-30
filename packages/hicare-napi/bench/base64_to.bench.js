import { bench } from 'vitest';
import rustFn from '@hicare-web/backend_napi';
import { MeasureDataString } from './data.js';
import  * as node_base64 from "./base64.js";
import { Buffer } from 'buffer';
import { base64BenchOption } from "./benchOption.js";

const bufferBase64 = Buffer.from(MeasureDataString);
bench('nodeJS string to base64', () => {
    node_base64.encodeBase64(MeasureDataString);
}, base64BenchOption);
bench('RUST NAPI string to base64', () => {
    rustFn.toBase64(MeasureDataString);
}, base64BenchOption);
