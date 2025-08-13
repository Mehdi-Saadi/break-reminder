import en from '@/main/i18n/langs/en';
import fa from '@/main/i18n/langs/fa';
import { Language } from '@/main/types/setting.ts';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fa,
  },
});

export default i18n;

export const directions: Readonly<Record<Language, 'auto' | 'ltr' | 'rtl'>> = {
  en: 'ltr',
  fa: 'rtl',
};
