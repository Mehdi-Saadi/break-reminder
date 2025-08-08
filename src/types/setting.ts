import { Minute, Second } from '@/types/time';
import { UUID } from 'node:crypto';

export interface Settings {
  // short break
  shortBreakDuration: Second;
  shortWorkDuration: Minute;

  // long break
  longBreakDuration: Second;
  countOfShortWorksForLongBreak: number;

  // options
  timeToPrepareForBreak: Second;
  strictBreak: boolean;
  allowPostponingBreaks: boolean;
  postponeDuration: Minute;

  // advanced
  autostart: boolean;
  doNotDisturb: boolean;
  notification: boolean;
  audibleAlert: boolean;
  selectedAudio: string | null;
  smartPause: boolean;
  screensaver: boolean;
  darkMode: boolean;

  shortBreakMessages: BreakMessages;
  longBreakMessages: BreakMessages;
  language: LanguageOption;
}

export type BreakMessages = Record<UUID, string>;
export type LanguageOption = 'en' | 'fa';
