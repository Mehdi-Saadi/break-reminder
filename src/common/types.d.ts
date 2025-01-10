// time
export type Minute = number;
export type Second = number;
export type Millisecond = number;

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type BreakMessages = Record<UUID, string>;
