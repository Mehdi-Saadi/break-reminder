import type { UUID } from 'node:crypto'
import type { Minute, Second } from '@/shared/types/time'

export interface Settings {
  workDuration: Minute

  // short break
  shortBreakDuration: Second

  // long break
  longBreakDuration: Second
  countOfShortWorksForLongBreak: number

  // options
  timeToPrepareForBreak: Second
  strictBreak: boolean
  allowPostponingBreaks: boolean
  postponeDuration: Minute

  // advanced
  autostart: boolean
  doNotDisturb: boolean
  notification: boolean
  audibleAlert: boolean
  selectedAudio: string | null
  smartPause: boolean
  screensaver: boolean
  darkMode: boolean

  shortBreakMessages: BreakMessages
  longBreakMessages: BreakMessages
  language: Language
}

export type BreakMessages = Record<UUID, string>
export type Language = 'en' | 'fa'
