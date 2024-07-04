/**
 * 지정된 초 만큼 대기합니다. 소수점을 사용하여 밀리초까지 지정할 수 있습니다.
 * @param {number} seconds
 * @returns {Promise<void>}
 */
export async function sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds / 1000));
}
