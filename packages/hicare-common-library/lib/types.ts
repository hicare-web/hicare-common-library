export type IterableContainer<T = unknown> = ReadonlyArray<T> | readonly [];

export type Mapped<T extends IterableContainer, K> = {
    -readonly [P in keyof T]: K;
};