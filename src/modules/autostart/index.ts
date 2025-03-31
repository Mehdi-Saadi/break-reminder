import settingState from '@/shared/state/setting';
import { disable, enable, isEnabled } from '@tauri-apps/plugin-autostart';

const enableAutoStartIfNeeded = async (): Promise<void> => {
  const isAutoStartEnabled = await isEnabled();
  const shouldEnable = settingState.value.autostart;

  if (shouldEnable !== isAutoStartEnabled) {
    await (shouldEnable ? enable() : disable());
  }
};

settingState.subscribe((newValue, oldValue) => {
  if (newValue.autostart !== oldValue.autostart) {
    enableAutoStartIfNeeded();
  }
});
enableAutoStartIfNeeded();
