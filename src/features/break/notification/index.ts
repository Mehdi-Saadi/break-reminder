import notify from '@/app/notification';
import settingState from '@/shared/state/setting';
import { invoke } from '@tauri-apps/api/core';

class BreakNotification {
  show = async (): Promise<void> => {
    if (
      settingState.settings.notification &&
      !await invoke('check_focused_window_maximized')
    ) {
      await notify(`Take a break in ${settingState.settings.timeToPrepareForBreak} seconds.`);
    }
  };
}

const breakNotification = new BreakNotification();

export default breakNotification;
