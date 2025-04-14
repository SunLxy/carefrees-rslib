export type RequireKey<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type ExcludesFalse = <T>(x: T | false | undefined | null) => x is T;
