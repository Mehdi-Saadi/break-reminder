import { useSettingStore } from '@/stores/setting.ts';
import { disable, enable, isEnabled as checkIsEnabled } from '@tauri-apps/plugin-autostart';

export const useAutostart = () => {
  const settingStore = useSettingStore();

  const enableIfNeeded = async (): Promise<void> => {
    const isEnabled = await checkIsEnabled();
    const shouldEnable = settingStore.settings.autostart;

    if (shouldEnable !== isEnabled) {
      await (shouldEnable ? enable() : disable());
    }
  };

  return {
    enableIfNeeded,
  };
};
