import { debounce as RemedaDebounce } from 'remeda';
/**
 *
 * func를 정의된 밀리초 동안 함수 호출을 지연시키는 함수
 * 디바운스된 함수가 호출될 때마다 clearTimeout()을 사용하여 현재 보류 중인 시간 제한을 지우고 setTimeout()을 사용하여 최소 ms 밀리초가 경과할 때까지 함수 호출을 지연시키는 새 시간 제한을 만듭니다.
 *
 *
 * @param func // 호출을 지연시킬 함수
 * @param {object} // delay 지연시킬 밀리초 시간
 * @returns // 새로 디바운스 된 함수 반환
 *  default - call : 함수 호출,
 * cancel : 지연된 함수 호출 취소,
 * flush : 지연된 함수 호출 즉시 실행,
 * isPending : 지연된 함수 호출이 보류 중인지 확인,
 * cachedValue : 최신 반환 값
 * @signature debounce(func,option)
 * @example
 *   const debounce = debounce(identity(), { timing: 'trailing', waitMs: 1000 });
 *   const result1 = debounce.call(1); // => undefined
 *   const result2 = debounce.call(2); // => undefined
 *   // 1초 후
 *   const result3 = debounce.call(3); // => 2
 *   // 1초 후
 *   debounce.cachedValue; // => 3
 *
 */
export const debounce = RemedaDebounce;
