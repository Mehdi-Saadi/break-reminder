import { invoke } from '@tauri-apps/api/core'
import { storeToRefs } from 'pinia'
import { useNotification } from '@/main/composables/notification'
import { useSettingStore } from '@/main/stores/setting'
import { useT } from '@/shared/composables/t.ts'

export function useBreakNotification() {
  const { settings } = storeToRefs(useSettingStore())
  const { notify } = useNotification()
  const t = useT()

  async function show(): Promise<void> {
    const {
      notification: showNotification,
      doNotDisturb,
      timeToPrepareForBreak,
    } = settings.value

    if (!showNotification) {
      return
    }

    const focusedWindowIsFullscreen = await invoke('check_focused_window_fullscreen')

    if (doNotDisturb && focusedWindowIsFullscreen) {
      return
    }

    await notify(t('takeBreakInfo', timeToPrepareForBreak))
  }

  return {
    show,
  }
}
