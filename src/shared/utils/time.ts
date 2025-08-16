import type { Millisecond, Minute, Second } from '@/shared/types/time'

export const minutesToSeconds = (minutes: Minute): Second => minutes * 60 as Second

export const secondsToMilliseconds = (seconds: Second): Millisecond => seconds * 1000 as Millisecond

export const minutesToMilliseconds = (minutes: Minute): Millisecond => secondsToMilliseconds(minutesToSeconds(minutes))

export const secondsToMinutes = (seconds: Second): Minute => Math.floor(seconds / 60) as Minute

export const numberToTwoDigits = (num: number): string => String(num).padStart(2, '0')

export function formatSecondsToMinutesAndSeconds(s: Second): string {
  const minutes = secondsToMinutes(s)
  const seconds = s % 60

  const twoDigitMinutes = numberToTwoDigits(minutes)
  const twoDigitSeconds = numberToTwoDigits(seconds)

  return `${twoDigitMinutes}:${twoDigitSeconds}`
}
