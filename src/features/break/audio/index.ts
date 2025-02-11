import preBreakAudio from '@/assets/audio/on_pre_break.wav';
import stopBreakAudio from '@/assets/audio/on_stop_break.wav';
import { playAudio } from '@/shared/audio';

export const playPreBreakAudio = (): Promise<void> => playAudio(preBreakAudio);
export const playStopBreakAudio = (): Promise<void> => playAudio(stopBreakAudio);
