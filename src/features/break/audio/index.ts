import preBreakAudio from '@/assets/audio/on_pre_break.wav';
import settingState from '@/shared/state/setting';
import stopBreakAudio from '@/assets/audio/on_stop_break.wav';
import { invoke } from '@tauri-apps/api/core';
import { playAudio } from '@/shared/audio';

const playPreBreakAudio = (): Promise<void> => playAudio(preBreakAudio);
const playStopBreakAudio = (): Promise<void> => playAudio(stopBreakAudio);

class BreakAudio {
  private preBreakAudioHasBeenPlayed: boolean = false;

  async playPreBreakAudio(): Promise<void> {
    if (
      settingState.settings.audibleAlert &&
      !await invoke('check_focused_window_maximized')
    ) {
      await playPreBreakAudio();
      this.preBreakAudioHasBeenPlayed = true;
    }
  }

  async playStopBreakAudio(): Promise<void> {
    if (
      settingState.settings.audibleAlert &&
      this.preBreakAudioHasBeenPlayed
    ) {
      await playStopBreakAudio();
      this.preBreakAudioHasBeenPlayed = false;
    }
  }
}

const breakAudio = new BreakAudio();

export default breakAudio;
