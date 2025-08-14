import { useNotification } from '@/main/composables/notification';
import { useSettingStore } from '@/main/stores/setting';
import { invoke } from '@tauri-apps/api/core';
import { storeToRefs } from 'pinia';

export const useBreakNotification = () => {
  const { settings } = storeToRefs(useSettingStore());
  const { notify } = useNotification();

  const show = async (): Promise<void> => {
    const {
      notification: showNotification,
      doNotDisturb,
      timeToPrepareForBreak,
    } = settings.value;

    if (!showNotification) {
      return;
    }

    const focusedWindowIsFullscreen = await invoke('check_focused_window_fullscreen');

    if (doNotDisturb && focusedWindowIsFullscreen) {
      return;
    }

    await notify(`Take a break in ${timeToPrepareForBreak} seconds.`);
  };

  return {
    show,
  };
};
