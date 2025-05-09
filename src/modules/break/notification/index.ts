import notify from '@/shared/notification';
import settingState from '@/shared/state/setting';
import { invoke } from '@tauri-apps/api/core';

class BreakNotification {
  show = async (): Promise<void> => {
    if (
      settingState.value.notification &&
      !(
        settingState.value.doNotDisturb &&
        await invoke('check_focused_window_fullscreen')
      )
    ) {
      await notify(`Take a break in ${settingState.value.timeToPrepareForBreak} seconds.`);
    }
  };
}

const breakNotification = new BreakNotification();

export default breakNotification;
