type FormatArgs = (string | number | boolean | null | undefined)[];

/**
 * 주어진 템플릿 문자열의 플레이스홀더를 인자로 대체합니다.
 *
 * @param {string} template - 플레이스홀더 '{:}'를 포함한 템플릿 문자열
 * @param {...(string|number|boolean|null|undefined)} args - 플레이스홀더를 대체할 값들
 * @returns {string} 플레이스홀더가 대체된 결과 문자열
 * @throws {Error} 인자의 수가 플레이스홀더의 수보다 적을 경우 에러를 발생시킵니다.
 *
 * @example
 * // 기본 사용법
 * format("Hello, {:}!", "world") // 반환값: "Hello, world!"
 *
 * @example
 * // 여러 플레이스홀더 사용
 * format("Name: {:}, Age: {:}", "John", 30) // 반환값: "Name: John, Age: 30"
 *
 * @example
 * // 이스케이프 처리
 * format("This is a \\{:} placeholder") // 반환값: "This is a {:} placeholder"
 *
 * @example
 * // 다양한 타입 사용
 * format("Boolean: {:}, Null: {:}, Undefined: {:}", true, null, undefined)
 * // 반환값: "Boolean: true, Null: , Undefined: "
 */
function format(template: string, ...args: FormatArgs): string {
    const parts: string[] = [];
    let lastIndex = 0;
    let argIndex = 0;
    let placeholderIndex = template.indexOf('{:}', lastIndex);

    while (placeholderIndex >= 0) {
        // 이스케이프 처리
        if (placeholderIndex > 0 && template[placeholderIndex - 1] === '\\') {
            parts.push(template.slice(lastIndex, placeholderIndex - 1), '{:}');
            lastIndex = placeholderIndex + 3;
            continue;
        }

        parts.push(template.slice(lastIndex, placeholderIndex));

        // 에러 처리: 인자 부족
        if (argIndex >= args.length) {
            throw new Error(`Missing argument for placeholder at index ${placeholderIndex}`);
        }

        const arg = args[argIndex++];
        parts.push(arg != null ? String(arg) : '');
        lastIndex = placeholderIndex + 3;
        placeholderIndex = template.indexOf('{:}', lastIndex);
    }

    parts.push(template.slice(lastIndex));

    // 에러 처리: 초과 인자
    if (argIndex < args.length) {
        console.warn(`${args.length - argIndex} extra argument(s) provided`);
    }

    return parts.join('');
}
