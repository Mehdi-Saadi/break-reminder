import { storeToRefs } from 'pinia'
import preBreakAudio from '@/assets/audio/on_pre_break.wav'
import stopBreakAudio from '@/assets/audio/on_stop_break.wav'
import { useSettingStore } from '@/main/stores/setting'
import { playAudio } from '@/main/utils/audio'

export function useBreakAudio() {
  const { settings } = storeToRefs(useSettingStore())

  let preBreakAudioHasBeenPlayed = false

  async function playPreBreakAudio(): Promise<void> {
    if (settings.value.audibleAlert) {
      await playAudio(preBreakAudio)
      preBreakAudioHasBeenPlayed = true
    }
  }

  async function playStopBreakAudio(): Promise<void> {
    const currentPreBreakAudioHasBeenPlayed = preBreakAudioHasBeenPlayed

    if (
      settings.value.audibleAlert
      && currentPreBreakAudioHasBeenPlayed
    ) {
      await playAudio(stopBreakAudio)

      if (preBreakAudioHasBeenPlayed === currentPreBreakAudioHasBeenPlayed) {
        preBreakAudioHasBeenPlayed = false
      }
    }
  }

  return {
    playPreBreakAudio,
    playStopBreakAudio,
  }
}
