import { uniqBy } from '../lib/utility/uniqBy';
import { describe, expect, it } from 'vitest';

describe('uniqBy', () => {
    it('키 함수를 기준으로 유니크한 값들을 가진 배열 반환', () => {
        const array = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
            { id: 3, name: 'John' },
            { id: 4, name: 'Jane' },
        ];

        const keyFunction = (item: { id: number; name: string }) => item.name;
        const result = uniqBy(array, keyFunction);

        expect(result).toEqual([
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
        ]);
    });

    it('빈 배열이 들어오면 빈 배열 리턴', () => {
        const array: any[] = [];
        const keyFunction = (item: any) => item;
        const result = uniqBy(array, keyFunction);

        expect(result).toEqual([]);
    });

    it('중복 값이 없으면 그대로 반환', () => {
        const array = [1, 2, 3, 4, 5];
        const keyFunction = (item: number) => item;
        const result = uniqBy(array, keyFunction);

        expect(result).toEqual(array);
    });
});
