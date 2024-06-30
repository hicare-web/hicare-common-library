import { Bench } from 'tinybench';
import * as uuid from 'uuid';
import rustFn from '@hicare-web/backend_napi';

const bench = new Bench({ time: 1000 });

bench
  .add('nodeJS uuid', () => {
    uuid.v4();
})
.add('RUST NAPI uuid', () => {
    rustFn.uuidV4();
})
.add('RUST NAPI uuid pure', () => {
    rustFn.uuidV4Pure();
})
.add('RUST NAPI uuid cached', () => {
    rustFn.uuidV4Cached();
})
.add('RUST NAPI uuid Queue', () => {
    rustFn.uuidV4Queue();
})
.add('RUST NAPI uuid Queue2', () => {
    rustFn.uuidV4Queue2();
});


await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run();

console.table(bench.table());
