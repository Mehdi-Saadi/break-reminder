import preBreakAudio from '@/assets/audio/on_pre_break.wav';
import settingState from '@/shared/state/setting';
import stopBreakAudio from '@/assets/audio/on_stop_break.wav';
import { playAudio } from '@/shared/audio';

const playPreBreakAudio = (): Promise<void> => playAudio(preBreakAudio);
const playStopBreakAudio = (): Promise<void> => playAudio(stopBreakAudio);

class BreakAudio {
  private preBreakAudioHasBeenPlayed: boolean = false;

  async playPreBreakAudio(): Promise<void> {
    if (settingState.value.audibleAlert) {
      await playPreBreakAudio();
      this.preBreakAudioHasBeenPlayed = true;
    }
  }

  async playStopBreakAudio(): Promise<void> {
    if (
      settingState.value.audibleAlert &&
      this.preBreakAudioHasBeenPlayed
    ) {
      await playStopBreakAudio();
      this.preBreakAudioHasBeenPlayed = false;
    }
  }
}

const breakAudio = new BreakAudio();

export default breakAudio;
