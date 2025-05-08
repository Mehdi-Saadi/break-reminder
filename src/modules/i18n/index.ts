import en from '@/modules/i18n/langs/en';
import fa from '@/modules/i18n/langs/fa';
import settingState from '@/shared/state/setting.ts';
import { KeyWord } from '@/modules/i18n/types';

const { language } = settingState.value;

const translations = {
  en,
  fa,
} as const;

settingState.subscribe((newValue): void => {
  if (newValue.language !== language) {
    window.location.reload();
  }
});

if (language === 'fa') {
  document.body.dir = 'rtl';
}

const t = (key: KeyWord): string => translations[language]?.[key] ?? key;

export default t;
