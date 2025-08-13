import {
  disable,
  enable,
  isEnabled as checkIsEnabled,
} from '@tauri-apps/plugin-autostart';
import { useSettingStore } from '@/main/stores/setting.ts';
import { watchEffect } from 'vue';

export const useAutostart = () => {
  const settingStore = useSettingStore();

  const setBasedOnStore = (): void => {
    watchEffect(async (): Promise<void> => {
      const isEnabled = await checkIsEnabled();
      const { autostart } = settingStore.settings;

      if (autostart !== isEnabled) {
        await (autostart ? enable() : disable());
      }
    });
  };

  return {
    setBasedOnStore,
  };
};
