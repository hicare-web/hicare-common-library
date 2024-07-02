import { throttle as LodashThrottle } from 'lodash-es';
/**
 *  'limit' 밀리초마다 최대 한 번만 `func`를 호출하는 스로틀링 함수
 *  func는 스로틀링 함수에 제공된 마지막 인수로 호출됩니다.
 *  이후 스로틀된 함수에 대한 호출은 마지막 `func` 호출의 결과를 반환합니다.
 *
 *
 *  @param {Function} func 지정시간마다 한 번만 실행할 함수
 * @param {number} [wait=0] 호출을 제한할 밀리초 단위의 시간
 * @returns {Function} 새로 스로틀링된 함수 반환
 * @example
 * // 스크롤 시 위치를 과도하게 업데이트하지 않도록 합니다.
 * jQuery(window).on('scroll', throttle(updatePosition, 100))
 *
 * // 클릭 이벤트가 발생할 때 renewToken을 호출하지만, 5분에 한 번 이상 호출하지 않습니다.
 * const throttled = throttle(renewToken, 300000, { 'trailing': false })
 * jQuery(element).on('click', throttled)
 */

export const throttle = LodashThrottle;
