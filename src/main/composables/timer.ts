import { useBreakAudio } from '@/main/composables/breakAudio';
import { useBreakNotification } from '@/main/composables/breakNotification';
import { useFullscreenBreak } from '@/main/composables/fullscreenBreak';
import { useSettingStore } from '@/main/stores/setting';
import { minutesToMilliseconds, secondsToMilliseconds } from '@/shared/utils/time';
import { listen } from '@tauri-apps/api/event';
import { BREAK_WINDOW_EVENT } from '@/shared/types/break';
import { storeToRefs } from 'pinia';
import { onMounted, onBeforeUnmount } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { Second } from '@/shared/types/time';

export const useTimer = (): void => {
  const { createShortBreakWindow, createLongBreakWindow } = useFullscreenBreak();
  const { playPreBreakAudio, playStopBreakAudio } = useBreakAudio();
  const { show: showBreakNotification } = useBreakNotification();
  const { settings } = storeToRefs(useSettingStore());

  let workTimeout: NodeJS.Timeout | null = null;
  let prepareForBreakTimeout: NodeJS.Timeout | null = null;
  let breakTimeout: NodeJS.Timeout | null = null;
  let countOfShortWorks = 0;

  const startWork = async (): Promise<void> => {
    resetWorkTimeout();
    resetPrepareForBreakTimeout();
    await playStopBreakAudio();
  };

  const resetWorkTimeout = (): void => {
    clearWorkTimeout();
    setWorkTimeout();
  };

  const clearWorkTimeout = (): void => {
    if (workTimeout) {
      clearTimeout(workTimeout);
      workTimeout = null;
    }
  };

  const setWorkTimeout = (): void => {
    workTimeout = setTimeout(
      takeBreakIfNeeded,
      minutesToMilliseconds(settings.value.workDuration)
    );
  };

  const takeBreakIfNeeded = async (): Promise<void> => {
    const focusedWindowIsFullscreen = await invoke('check_focused_window_fullscreen');

    if (settings.value.doNotDisturb && focusedWindowIsFullscreen) {
      await startWork();
    } else {
      await takeBreak();
    }
  };

  const takeBreak = async (): Promise<void> => {
    countOfShortWorks++;

    if (shouldTakeLongBreak()) {
      await takeLongBreak();
    } else {
      await takeShortBreak();
    }

    await playPreBreakAudio();
  };

  const shouldTakeLongBreak = (): boolean => {
    if (countOfShortWorks >= settings.value.countOfShortWorksForLongBreak) {
      countOfShortWorks = 0;
      return true;
    }
    return false;
  };

  const takeLongBreak = async (): Promise<void> => {
    await createLongBreakWindow();
    resetBreakTimeout(settings.value.longBreakDuration);
  };

  const takeShortBreak = async (): Promise<void> => {
    await createShortBreakWindow();
    resetBreakTimeout(settings.value.shortBreakDuration);
  };

  const resetBreakTimeout = (seconds: Second): void => {
    clearBreakTimeout();
    setBreakTimeout(seconds);
  };

  const clearBreakTimeout = (): void => {
    if (breakTimeout) {
      clearTimeout(breakTimeout);
      breakTimeout = null;
    }
  };

  const setBreakTimeout = (seconds: Second): void => {
    breakTimeout = setTimeout(
      startWork,
      secondsToMilliseconds(seconds)
    );
  };

  const resetPrepareForBreakTimeout = (): void => {
    clearPrepareForBreakTimeout();
    setPrepareForBreakTimeout();
  };

  const clearPrepareForBreakTimeout = (): void => {
    if (prepareForBreakTimeout) {
      clearTimeout(prepareForBreakTimeout);
      prepareForBreakTimeout = null;
    }
  };

  const setPrepareForBreakTimeout = (): void => {
    const workTime = minutesToMilliseconds(settings.value.workDuration);
    const prepareTime = secondsToMilliseconds(settings.value.timeToPrepareForBreak);
    const prepareForBreakTime = workTime - prepareTime;

    prepareForBreakTimeout = setTimeout(showBreakNotification, prepareForBreakTime);
  };

  const initBreakWindowListeners = async (): Promise<void> => {
    await listen(BREAK_WINDOW_EVENT.skip, () => {
      clearBreakTimeout();
      startWork();
    });
  };

  onMounted(async () => {
    await startWork();
    await initBreakWindowListeners();
  });

  onBeforeUnmount(() => {
    clearWorkTimeout();
    clearBreakTimeout();
    clearPrepareForBreakTimeout();
  });
};
