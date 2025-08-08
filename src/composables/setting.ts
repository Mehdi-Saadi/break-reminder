import { directions } from '@/i18n';
import { useSettingStore } from '@/stores/setting.ts';
import { useColorMode } from '@vueuse/core';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

export const initSettingWatchers = (): void => {
  const settingStore = useSettingStore();
  const mode = useColorMode();

  watchEffect(() => {
    mode.value = settingStore.settings.darkMode
      ? 'dark'
      : 'light';
  });

  const { locale } = useI18n();

  watchEffect(() => {
    const { language } = settingStore.settings;

    locale.value = language;

    document.documentElement.dir = directions[language];
  });
};
