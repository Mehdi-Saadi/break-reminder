import { Millisecond, Minute, Second } from '@/common/types';

export const minutesToSeconds = (minutes: Minute): Second => minutes * 60;

export const secondsToMilliseconds = (seconds: Second): Millisecond => seconds * 1000;

export const minutesToMilliseconds = (minutes: Minute): Millisecond => secondsToMilliseconds(minutesToSeconds(minutes));
