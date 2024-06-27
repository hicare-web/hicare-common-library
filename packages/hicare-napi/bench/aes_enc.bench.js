import { bench } from 'vitest';
import { encryptAES } from './node.crypto.js';
import rustFn from '@hicare-web/backend_napi';

const passwordAES = 'af345a3c-7733-11ec-a226-06a78b1c250a';
const saltAES = '5HXIfFQ2Hw0IJVWBPyb/jW8CwlBbJhAZ';

bench('nodejs AES Encrypt', () => {
    encryptAES(saltAES, passwordAES);
});

bench('RUST NAPI AES Encrypt', () => {
    rustFn.encryptAES(saltAES, passwordAES);
});
