import settingState from '@/shared/state/setting';
import { disable, enable, isEnabled } from '@tauri-apps/plugin-autostart';
import { settingStateEventBus } from '@/shared/event/setting';

const enableAutoStartIfNeeded = async (): Promise<void> => {
  const isAutoStartEnabled = await isEnabled();
  const shouldEnable = settingState.settings.autostart;

  if (shouldEnable !== isAutoStartEnabled) {
    await (shouldEnable ? enable() : disable());
  }
};

settingStateEventBus.on('change', enableAutoStartIfNeeded);
enableAutoStartIfNeeded();
