import { useColorMode } from '@vueuse/core'
import { watchEffect } from 'vue'
import { useSettingStore } from '@/main/stores/setting'

export function useDarkMode() {
  const settingStore = useSettingStore()
  const mode = useColorMode()

  function setBasedOnStore(): void {
    watchEffect(() => {
      mode.value = settingStore.settings.darkMode
        ? 'dark'
        : 'light'
    })
  }

  return {
    setBasedOnStore,
  }
}
