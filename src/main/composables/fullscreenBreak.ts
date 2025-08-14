import { useBreakMessage } from '@/main/composables/breakMessage';
import { useSettingStore } from '@/main/stores/setting';
import { generateRandomAlphabeticId } from '@/main/utils/crypto';
import { objectToQuery } from '@/main/utils/url';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { availableMonitors, Monitor } from '@tauri-apps/api/window';
import { BreakWindowPayload } from '@/shared/types/break';
import { storeToRefs } from 'pinia';

interface WebviewWindowParams {
  monitor: Monitor;
  query: BreakWindowPayload;
}

export const useFullscreenBreak = () => {
  const { getShortBreakMessage, getLongBreakMessage } = useBreakMessage();
  const { settings } = storeToRefs(useSettingStore());

  // TODO: show break message only for largest monitor
  // const getLargestOrFirstMonitor = async (): Promise<Monitor> => {
  //   const monitors = await availableMonitors();
  //
  //   return monitors.reduce((previousMonitor, currentMonitor) => {
  //     if (previousMonitor.scaleFactor === currentMonitor.scaleFactor) {
  //       return previousMonitor;
  //     }
  //     if (previousMonitor.scaleFactor > currentMonitor.scaleFactor) {
  //       return previousMonitor;
  //     }
  //     return currentMonitor;
  //   });
  // };

  const createWebviewWindow = (
    params: WebviewWindowParams
  ): WebviewWindow => {
    const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`;
    const queryParams = params.query ? objectToQuery(params.query) : '';

    const IN_PRODUCTION = import.meta.env.VITE_PRODUCTION === 'true';

    return new WebviewWindow(windowUniqueLabel, {
      x: params.monitor.position.x,
      y: params.monitor.position.y,
      fullscreen: true,
      decorations: !IN_PRODUCTION,
      alwaysOnTop: true,
      skipTaskbar: IN_PRODUCTION,
      resizable: false,
      focus: true,
      visible: false,
      transparent: true,
      url: `/src/break/index.html${queryParams}`,
    });
  };

  const createFullscreenBreak = async (
    breakWindowPayload: BreakWindowPayload,
  ): Promise<void> => {
    const monitors = await availableMonitors();

    for (const monitor of monitors) {
      const breakWindow = createWebviewWindow({
        monitor,
        query: breakWindowPayload,
      });

      await breakWindow.once('tauri://created', (): Promise<void> => breakWindow.show());

      await breakWindow.once('tauri://error', error => {
        console.error('Error while creating window:', breakWindow, error);
      });
    }
  };

  const createShortBreakWindow = async (): Promise<void> => {
    await createFullscreenBreak({
      message: getShortBreakMessage(),
      timeout: settings.value.shortBreakDuration,
      showSkipBtn: !settings.value.strictBreak,
      showPostponeBtn: settings.value.allowPostponingBreaks,
    });
  };

  const createLongBreakWindow = async (): Promise<void> => {
    await createFullscreenBreak({
      message: getLongBreakMessage(),
      timeout: settings.value.longBreakDuration,
      showSkipBtn: !settings.value.strictBreak,
      showPostponeBtn: settings.value.allowPostponingBreaks,
    });
  };

  return {
    createShortBreakWindow,
    createLongBreakWindow,
  };
};
