import { Millisecond } from '@/shared/time';

export interface BreakWindowPayload {
  message?: string;
  timeout: Millisecond;
}

export const BREAK_WINDOW_EVENT = Object.freeze({
  skip: 'break-window-skip',
  postpone: 'break-window-postpone',
});
