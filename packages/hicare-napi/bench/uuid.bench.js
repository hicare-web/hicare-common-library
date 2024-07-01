import * as uuid from 'uuid';
import rustFn from '@hicare-web/backend_napi';
import { bench, describe } from 'vitest';
import { uuidBenchOption } from "./benchOption.js";

describe('uuid', () => {
    bench('nodeJS uuid', () => {
        uuid.v4();
    }, uuidBenchOption);

    bench('RUST NAPI uuid', () => {
        rustFn.uuidV4();
    }, uuidBenchOption);

    bench('RUST NAPI uuid pure', () => {
        rustFn.uuidV4Pure();
    }, uuidBenchOption);

    bench('RUST NAPI uuid Queue', () => {
        rustFn.uuidV4Queue();
    }, uuidBenchOption);

    bench('RUST NAPI uuid Queue2', () => {
        rustFn.uuidV4Queue2();
    }, uuidBenchOption);
});