import { directions } from '@/i18n';
import { useSettingStore } from '@/stores/setting.ts';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

export const useLanguage = () => {
  const settingStore = useSettingStore();
  const { locale } = useI18n();

  const setBasedOnStore = (): void => {
    watchEffect(() => {
      const { language } = settingStore.settings;

      locale.value = language;

      document.documentElement.dir = directions[language];
    });
  };

  return {
    setBasedOnStore,
  };
};
