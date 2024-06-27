import { bench } from 'vitest';
import { pbkdf2 } from './node.crypto.js';
import rustFn from '@hicare-web/backend_napi';

const passwordPBKDF2 = 'hicare228@@';
const salt = '100000.+hjY4OxRR3gVFiZg06uP1RodTHT6Bn4U94ICdABAKTg=';
const iterations = 1000;
const keySize = 16;

bench('nodejs PBKDF2', () => {
    pbkdf2(passwordPBKDF2, salt, { keySize, iterations });
});

bench('RUST NAPI PBKDF2', () => {
    rustFn.PBKDF2(passwordPBKDF2, salt, { keySize, iterations });
});
