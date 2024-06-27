import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import * as pkcs7 from 'pkcs7';

export function pbkdf2(password, saltKey, options) {
    return CryptoJS.PBKDF2(password, saltKey, {
        keySize: options?.keySize || 16,
        iterations: options?.iterations || 1000,
    }).toString(CryptoJS.enc.Base64);
}

export function encryptAES(symKey, text) {
    const iv = crypto.createHash('md5').update(symKey).digest();

    const cipher = crypto.createCipheriv('AES-256-CBC', symKey, iv);

    const chkJson = typeof text === 'object' ? JSON.stringify(text) : text;

    const encrypted = cipher.update(chkJson);

    return Buffer.concat([encrypted, cipher.final()]).toString('base64');
}

export function decryptAES(symKey, text) {
    const iv = crypto.createHash('md5').update(symKey).digest();
    const decipher = crypto.createDecipheriv('AES-256-CBC', symKey, iv);
    decipher.setAutoPadding(false);
    let decrypted = decipher.update(text, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return pkcs7Unpad(decrypted);
}
function pkcs7Unpad(params) {
    const buffer = Buffer.from(params, 'utf8');
    const bytes = new Uint8Array(buffer.length);
    let i = buffer.length;
    while (i--) {
        bytes[i] = buffer[i];
    }
    const result = Buffer.from(pkcs7.unpad(bytes));
    return result.toString('utf8');
}
