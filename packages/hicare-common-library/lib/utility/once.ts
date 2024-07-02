import { once as RemedaOnce } from 'remeda';
/**
 * 함수를 한 번만 호출하도록 제한하는 함수입니다
 * 이후 호출 시에는 `undefined`를 반환합니다
 *
 *
 *  @param fn - 제한할 함수
 *  @signature once(fn)
 *  @example
 *  const initialize = once(fn);
 *  initialize();
 *  initialize();
 *  // => `fn`는 한 번만 호출됩니다
 *  @category Function
 */

export const once = RemedaOnce;
