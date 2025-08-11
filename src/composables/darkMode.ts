import { useSettingStore } from '@/stores/setting.ts';
import { useColorMode } from '@vueuse/core';
import { watchEffect } from 'vue';

export const useDarkMode = () => {
  const settingStore = useSettingStore();
  const mode = useColorMode();

  const setBasedOnStore = (): void => {
    watchEffect(() => {
      mode.value = settingStore.settings.darkMode
        ? 'dark'
        : 'light';
    });
  };

  return {
    setBasedOnStore,
  };
};
