import type { Language } from '@/shared/types/setting'
import { createI18n } from 'vue-i18n'
import en from '@/shared/i18n/langs/en'
import fa from '@/shared/i18n/langs/fa'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fa,
  },
})

export default i18n

export const directions: Readonly<Record<Language, 'auto' | 'ltr' | 'rtl'>> = {
  en: 'ltr',
  fa: 'rtl',
}
