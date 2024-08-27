import { inRange as _inRange } from 'lib/guard';
import { describe, expect, it } from 'vitest';

describe('inRange ', () => {
    it('첫 번째 인자가 두번째와 세 번째 인자 사이의 숫자일 때 true 반환', () => {
        expect(_inRange(1, 0, 2)).toBe(true);
        expect(_inRange(1, 1, 2)).toBe(true);
        expect(_inRange(-1, -5, 1)).toBe(true);
    });
});
