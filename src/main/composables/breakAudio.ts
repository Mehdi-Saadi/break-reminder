import preBreakAudio from '@/assets/audio/on_pre_break.wav';
import stopBreakAudio from '@/assets/audio/on_stop_break.wav';
import { useSettingStore } from '@/main/stores/setting';
import { playAudio } from '@/main/utils/audio';
import { storeToRefs } from 'pinia';

export const useBreakAudio = () => {
  const { settings } = storeToRefs(useSettingStore());

  let preBreakAudioHasBeenPlayed = false;

  const playPreBreakAudio = async (): Promise<void> => {
    if (settings.value.audibleAlert) {
      await playAudio(preBreakAudio);
      preBreakAudioHasBeenPlayed = true;
    }
  };

  const playStopBreakAudio = async (): Promise<void> => {
    const currentPreBreakAudioHasBeenPlayed = preBreakAudioHasBeenPlayed;

    if (
      settings.value.audibleAlert &&
      currentPreBreakAudioHasBeenPlayed
    ) {
      await playAudio(stopBreakAudio);

      if (preBreakAudioHasBeenPlayed === currentPreBreakAudioHasBeenPlayed) {
        preBreakAudioHasBeenPlayed = false;
      }
    }
  };

  return {
    playPreBreakAudio,
    playStopBreakAudio,
  };
};
