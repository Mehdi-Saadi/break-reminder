import { Branded } from './types';

export type Minute = Branded<number, 'Minute'>;
export type Second = Branded<number, 'Second'>;
export type Millisecond = Branded<number, 'Millisecond'>;

export const minutesToSeconds = (minutes: Minute): Second => minutes * 60 as Second;

export const secondsToMilliseconds = (seconds: Second): Millisecond => seconds * 1000 as Millisecond;

export const minutesToMilliseconds = (minutes: Minute): Millisecond => secondsToMilliseconds(minutesToSeconds(minutes));
