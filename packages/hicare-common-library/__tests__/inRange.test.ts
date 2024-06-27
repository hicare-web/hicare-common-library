import { inRange as _inRange } from 'lib/utility/inRange';
import { describe, expect, it } from 'vitest';

describe('inRange ', () => {
    it('첫 번째 인자가 두번째와 세 번째 인자 사이의 숫자일 때 true 반환', () => {
        expect(_inRange(1, 0, 2)).toBe(true);
        expect(_inRange(1, 1, 2)).toBe(true);
        expect(_inRange(-1, -5, 1)).toBe(true);
        expect(_inRange(5.2, 10)).toBe(true);

        const date1 = new Date('2024-01-01');
        const date2 = new Date('2024-06-01');
        const date3 = new Date('2024-12-31');
        expect(_inRange(date2, date1, date3)).toBe(true);
    });
});
