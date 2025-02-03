import { Millisecond } from '@/shared/time';

export interface BreakWindowPayload {
  message: string;
  timeout: Millisecond
}
