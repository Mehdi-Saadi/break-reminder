import { playAudio } from '@/shared/audio';

export const playPreBreakAudio = (): Promise<void> => playAudio('/src/assets/audio/on_pre_break.wav');
export const playStopBreakAudio = (): Promise<void> => playAudio('/src/assets/audio/on_stop_break.wav');
