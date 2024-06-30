import { Buffer } from 'buffer';
/**
 * 입력 문자열이 URL 문자열인지 확인합니다.
 * @param {string} str 확인할 문자열
 * @returns {boolean} URL 문자열 여부
 */
function isUrl(str) {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 일반 문자열을 Base64로 인코딩합니다.
 * @param {string} str 인코딩할 문자열
 * @returns {string} Base64 인코딩된 문자열
 */
function encodeBase64Interal(str) {
  return Buffer.from(str).toString('base64');
}

/**
 * URL-safe Base64로 인코딩합니다.
 * @param {string} str 인코딩할 문자열
 * @returns {string} URL-safe Base64 인코딩된 문자열
 */
function encodeUrlSafeBase64(str) {
  return encodeBase64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * 입력 문자열을 Base64로 인코딩합니다.
 * URL 문자열이면 URL-safe Base64로 인코딩하고, 그렇지 않으면 일반 Base64로 인코딩합니다.
 * @param {string} str 인코딩할 문자열
 * @returns {string} Base64 또는 URL-safe Base64 인코딩된 문자열
 */
export function encodeBase64(str) {
  if (isUrl(str)) {
    return encodeUrlSafeBase64(str);
  } else {
    return encodeBase64Interal(str);
  }
}

/**
 * Base64 또는 URL-safe Base64 문자열을 디코딩합니다.
 * @param {string} str 디코딩할 문자열
 * @returns {string} 디코딩된 문자열
 */
export function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString();
}