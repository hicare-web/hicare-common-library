import { bench, describe } from 'vitest';
import { encryptAES } from './node.crypto.js';
import rustFn from '@hicare-web/backend_napi';
import { decryptAES } from './node.crypto.js';
import { aesBenchOption } from "./benchOption.js";

const passwordAES = 'af345a3c-7733-11ec-a226-06a78b1c250a';
const encryptedAES = 'cSYjZ+L2+KvrEWskwLAoP0BPHfOo1tTFrhp5yZezcMR/8AX+63MTdCQX+I9vQLdk';
const saltAES = '5HXIfFQ2Hw0IJVWBPyb/jW8CwlBbJhAZ';

describe('AES Encrypt', () => {
  bench('nodejs AES Decrypt', () => {
    decryptAES(saltAES, encryptedAES);
  }, aesBenchOption);

  bench('RUST NAPI AES Decrypt', () => {
    rustFn.decryptAES(saltAES, encryptedAES);
  }, aesBenchOption);


  bench('RUST NAPI AES Decrypt2', () => {
    rustFn.decryptAESCached(saltAES, encryptedAES);
  }, aesBenchOption);
})

describe('AES Decrypt', () => {
  bench('nodejs AES Encrypt', () => {
    encryptAES(saltAES, passwordAES);
  }, aesBenchOption);

  bench('RUST NAPI AES Encrypt', () => {
    rustFn.encryptAES(saltAES, passwordAES);
  }, aesBenchOption);

  bench('RUST NAPI AES Encrypt2', () => {
    rustFn.encryptAESCached(saltAES, passwordAES);
  }, aesBenchOption);

});