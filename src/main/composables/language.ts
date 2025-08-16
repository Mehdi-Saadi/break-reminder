import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingStore } from '@/main/stores/setting'
import { directions } from '@/shared/i18n'

export function useLanguage() {
  const settingStore = useSettingStore()
  const { locale } = useI18n()

  function setBasedOnStore(): void {
    watchEffect(() => {
      const { language } = settingStore.settings

      locale.value = language

      document.documentElement.dir = directions[language]
    })
  }

  return {
    setBasedOnStore,
  }
}
