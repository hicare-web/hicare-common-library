import { bench, describe } from 'vitest';
import rustFn from '@hicare-web/backend_napi';
import { MeasureDataString } from './data.js';
import * as node_base64 from './base64.js';
import { Buffer } from 'buffer';
import { base64BenchOption } from './benchOption.js';

const base64String = Buffer.from(MeasureDataString).toString('base64');
const base64Buf = Buffer.from(MeasureDataString);
const bufferBase64 = Buffer.from(MeasureDataString);

describe('Base64 From', () => {
    bench(
        'nodeJS string from base64',
        () => {
            node_base64.decodeBase64(base64String);
        },
        base64BenchOption,
    );

    bench(
        'RUST NAPI string from base64',
        () => {
            rustFn.fromBase64(base64String);
        },
        base64BenchOption,
    );
});

describe('nodeJS string from base64', () => {
    bench(
        'nodeJS string to base64',
        () => {
            node_base64.encodeBase64(MeasureDataString);
        },
        base64BenchOption,
    );
    bench(
        'RUST NAPI string to base64',
        () => {
            rustFn.toBase64(MeasureDataString);
        },
        base64BenchOption,
    );
});
