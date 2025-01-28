import { Millisecond } from '@/shared/time';

/** 
 * Break window event to pass data that should be display on it form main window
 */
export const BREAK_WINDOW_EVENT = 'break-window-event';

export interface BreakWindowPayload {
  message: string;
  timeout: Millisecond
}
