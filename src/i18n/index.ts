import en from '@/i18n/langs/en';
import fa from '@/i18n/langs/fa';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fa,
  },
});

export default i18n;
