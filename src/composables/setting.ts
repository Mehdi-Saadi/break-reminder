import { directions } from '@/i18n';
import { useSettingStore } from '@/stores/setting.ts';
import { useColorMode } from '@vueuse/core';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

export const useSetting = () => {
  const settingStore = useSettingStore();
  const mode = useColorMode();
  const { locale } = useI18n();

  const initWatchers = (): void => {
    // dark mode watcher
    watchEffect(() => {
      mode.value = settingStore.settings.darkMode
        ? 'dark'
        : 'light';
    });

    // language watcher
    watchEffect(() => {
      const { language } = settingStore.settings;

      locale.value = language;

      document.documentElement.dir = directions[language];
    });
  };

  return {
    initWatchers,
  };
};
