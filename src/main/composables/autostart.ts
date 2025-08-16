import {
  isEnabled as checkIsEnabled,
  disable,
  enable,
} from '@tauri-apps/plugin-autostart'
import { watchEffect } from 'vue'
import { useSettingStore } from '@/main/stores/setting'

export function useAutostart() {
  const settingStore = useSettingStore()

  function setBasedOnStore(): void {
    watchEffect(async (): Promise<void> => {
      const isEnabled = await checkIsEnabled()
      const { autostart } = settingStore.settings

      if (autostart !== isEnabled) {
        await (autostart ? enable() : disable())
      }
    })
  }

  return {
    setBasedOnStore,
  }
}
