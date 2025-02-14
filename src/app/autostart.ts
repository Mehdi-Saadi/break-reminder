import settingState from '@/shared/state/setting';
import { disable, enable, isEnabled } from '@tauri-apps/plugin-autostart';
import { settingStateEventBus } from '@/shared/event/setting';

const enableAutoStartIfNeeded = async (): Promise<void> => {
  const checkIsEnabled = await isEnabled();

  if (settingState.settings.autostart && !checkIsEnabled) {
    await enable();
  } else if (checkIsEnabled) {
    await disable();
  }
};

settingStateEventBus.on('change', enableAutoStartIfNeeded);
enableAutoStartIfNeeded();
