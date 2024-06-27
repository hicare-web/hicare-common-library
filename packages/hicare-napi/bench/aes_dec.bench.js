import { bench } from 'vitest';
import { decryptAES } from './node.crypto.js';
import rustFn from '@hicare-web/backend_napi';

const encryptedAES = 'cSYjZ+L2+KvrEWskwLAoP0BPHfOo1tTFrhp5yZezcMR/8AX+63MTdCQX+I9vQLdk';
const saltAES = '5HXIfFQ2Hw0IJVWBPyb/jW8CwlBbJhAZ';

bench('nodejs AES Decrypt', () => {
    decryptAES(saltAES, encryptedAES);
});

bench('RUST NAPI AES Decrypt', () => {
    rustFn.decryptAES(saltAES, encryptedAES);
});
