import type { IsAny } from 'type-fest';

export type IterableContainer<T = unknown> = ReadonlyArray<T> | readonly [];

export type Mapped<T extends IterableContainer, K> = {
    -readonly [P in keyof T]: K;
};

export type FormatArgs = (string | number | boolean | null | undefined)[];

export interface PersonName {
    lastName?: string;
    firstName?: string;
    middleName?: string;
}

export type NarrowedTo<T, Base> =
    Extract<T, Base> extends never ? Base : IsAny<T> extends true ? Base : Extract<T, Base>;

export interface CodeItem {
    codeId: string;
    codeParentId: string | null;
    codeText?: string | null;
    [key: string]: any; // 추가 속성을 허용
}

// TreeNode 인터페이스
export interface TreeNode extends CodeItem {
    children: TreeNode[];
}

export type GroupByKey = string | number | symbol;
