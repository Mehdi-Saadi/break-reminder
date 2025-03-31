import { Millisecond } from '@/shared/time';

export interface IBreakWindowPayload {
  message?: string;
  timeout: Millisecond;
  showSkipBtn: boolean;
  showPostponeBtn: boolean;
}

export const BREAK_WINDOW_EVENT = Object.freeze({
  skip: 'break-window-skip',
  postpone: 'break-window-postpone',
});
