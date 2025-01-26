export type Minute = number;
export type Second = number;
export type Millisecond = number;

export const minutesToSeconds = (minutes: Minute): Second => minutes * 60;

export const secondsToMilliseconds = (seconds: Second): Millisecond => seconds * 1000;

export const minutesToMilliseconds = (minutes: Minute): Millisecond => secondsToMilliseconds(minutesToSeconds(minutes));
