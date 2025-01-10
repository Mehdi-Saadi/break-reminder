// time
export type Minutes = number;
export type Seconds = number;
export type Milliseconds = number;

export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type BreakMessages = Record<UUID, string>;
