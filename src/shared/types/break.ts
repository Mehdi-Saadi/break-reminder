import { Second } from '@/shared/types/time';

export interface BreakWindowPayload {
  message?: string;
  timeout: Second;
  showSkipBtn: boolean;
  showPostponeBtn: boolean;
}

export const BREAK_WINDOW_EVENT = {
  skip: 'break-window-skip',
  postpone: 'break-window-postpone',
} as const;
