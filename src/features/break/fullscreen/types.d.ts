import { Millisecond } from '@/shared/time';

export interface BreakWindowPayload {
  message: string;
  timeout: Millisecond
}

export interface IWebviewWindowParams {
  x?: number;
  y?: number;
  query?: BreakWindowPayload;
}
