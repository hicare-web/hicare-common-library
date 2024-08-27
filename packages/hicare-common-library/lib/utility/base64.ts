const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * 문자열 또는 Uint8Array를 Base64로 인코딩합니다.
 *
 * @param input - 인코딩할 문자열 또는 Uint8Array
 * @returns Base64로 인코딩된 문자열
 * @signature
 *  base64Encode(input: string | Uint8Array): string
 * @example
 *  base64Encode('Hello, World!') // => 'SGVsbG8sIFdvcmxkIQ=='
 *  base64Encode(new Uint8Array([72, 101, 108, 108, 111])) // => 'SGVsbG8='
 * @category String - Encoding
 */
export function base64Encode(input: string | Uint8Array): string {
    let result = '';
    let i = 0;
    let bytes: number[] | Uint8Array;

    if (typeof input === 'string') {
        bytes = new TextEncoder().encode(input);
    } else {
        bytes = Array.from(input);
    }
    ``;
    while (i < bytes.length) {
        const byte1 = bytes[i++];
        const byte2 = i < bytes.length ? bytes[i++] : 0;
        const byte3 = i < bytes.length ? bytes[i++] : 0;

        const enc1 = byte1 >> 2;
        const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
        const enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
        const enc4 = byte3 & 63;

        result +=
            base64Chars[enc1] +
            base64Chars[enc2] +
            (i > bytes.length - 2 ? '=' : base64Chars[enc3]) +
            (i > bytes.length - 3 ? '=' : base64Chars[enc4]);
    }

    return result;
}

/**
 * Base64로 인코딩된 문자열을 디코딩합니다.
 *
 * @param input - 디코딩할 Base64 문자열
 * @returns 디코딩된 Uint8Array
 * @signature
 *  base64Decode(input: string): Uint8Array
 * @example
 *  base64Decode('SGVsbG8sIFdvcmxkIQ==') // => Uint8Array [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
 * @category String - Decoding
 */
export function base64Decode(input: string): Uint8Array {
    const bytes: number[] = [];
    let i = 0;

    // 패딩 문자 '=' 제거
    input = input.replace(/=+$/, '');

    while (i < input.length) {
        const enc1 = base64Chars.indexOf(input[i++]);
        const enc2 = base64Chars.indexOf(input[i++]);
        const enc3 = base64Chars.indexOf(input[i++]);
        const enc4 = base64Chars.indexOf(input[i++]);

        const byte1 = (enc1 << 2) | (enc2 >> 4);
        const byte2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        const byte3 = ((enc3 & 3) << 6) | enc4;

        bytes.push(byte1);
        if (enc3 !== 64) bytes.push(byte2);
        if (enc4 !== 64) bytes.push(byte3);
    }

    return new Uint8Array(bytes);
}

/**
 * Uint8Array를 UTF-8 문자열로 변환합니다.
 *
 * @param input - 변환할 Uint8Array
 * @returns UTF-8 문자열
 * @signature
 *  uint8ArrayToString(input: Uint8Array): string
 * @example
 *  uint8ArrayToString(new Uint8Array([72, 101, 108, 108, 111])) // => 'Hello'
 * @category Conversion
 */
export function uint8ArrayToString(input: Uint8Array): string {
    return new TextDecoder().decode(input);
}

/**
 * UTF-8 문자열을 Uint8Array로 변환합니다.
 *
 * @param input - 변환할 UTF-8 문자열
 * @returns Uint8Array
 * @signature
 *  stringToUint8Array(input: string): Uint8Array
 * @example
 *  stringToUint8Array('Hello') // => Uint8Array [72, 101, 108, 108, 111]
 * @category Conversion
 */
export function stringToUint8Array(input: string): Uint8Array {
    return new TextEncoder().encode(input);
}

export const atob = base64Decode;
export const btoa = base64Encode;
