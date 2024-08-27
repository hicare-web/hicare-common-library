/**
 * 주어진 값이 Symbol 타입인지 확인하는 함수
 *
 * @param data - 확인할 값
 * @returns 값이 Symbol이면 true, 아니면 false
 * @signature
 *  isSymbol(data)
 * @example
 *  isSymbol(Symbol('test')) // => true
 *  isSymbol(Symbol.iterator) // => true
 *
 *  isSymbol('string') // => false
 *  isSymbol(42) // => false
 *  isSymbol({}) // => false
 *  isSymbol(null) // => false
 * @category Guard
 */
export function isSymbol(data: unknown): data is symbol {
    return typeof data === 'symbol';
}
