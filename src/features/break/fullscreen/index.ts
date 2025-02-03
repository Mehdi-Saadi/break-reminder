import { BreakWindowPayload } from '@/features/break/fullscreen/types';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { availableMonitors } from '@tauri-apps/api/window';
import { secondsToMilliseconds } from '@/shared/time';
import breakMessage from '@/features/break/message';
import settingState from '@/shared/state/setting';
import { objectToQuery } from '@/shared/url';

interface IWebviewWindowParams {
  x?: number;
  y?: number;
  query: BreakWindowPayload;
}

const createBreakWebviewWindow = (params: IWebviewWindowParams): WebviewWindow => {
  const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`;
  const queryParams = params.query ? objectToQuery(params.query) : '';

  return new WebviewWindow(windowUniqueLabel, {
    x: params.x,
    y: params.y,
    maximized: true,
    decorations: !import.meta.env.PROD,
    alwaysOnTop: true,
    skipTaskbar: import.meta.env.PROD,
    resizable: false,
    focus: true,
    visible: false,
    transparent: true,
    url: `/src/features/break/fullscreen/window/index.html${queryParams}`,
  });
};

// TODO: show break message only for largest monitor
// const getLargestOrFirstMonitor = async (): Promise<Monitor> => {
//   const monitors = await availableMonitors();

//   return monitors.reduce((previousMonitor, currentMonitor) => {
//     if (previousMonitor.scaleFactor === currentMonitor.scaleFactor) {
//       return previousMonitor;
//     } else if (previousMonitor.scaleFactor > currentMonitor.scaleFactor) {
//       return previousMonitor;
//     }
//     return currentMonitor;
//   });
// };

const createFullscreenBreak = async (
  breakWindowPayload: BreakWindowPayload
): Promise<void> => {
  const monitors = await availableMonitors();

  for (const monitor of monitors) {
    const breakWindow = createBreakWebviewWindow({
      x: monitor.position.x,
      y: monitor.position.y,
      query: breakWindowPayload,
    });

    await breakWindow.once('tauri://created', async (): Promise<void> => await breakWindow.show());

    await breakWindow.once('tauri://error', error => {
      console.error('Error while creating window:', breakWindow, error);
    });
  }
};

export const createFullscreenShortBreak = async (): Promise<void> => {
  await createFullscreenBreak({
    message: breakMessage.getShortBreakMessage(),
    timeout: secondsToMilliseconds(settingState.settings.shortBreakDuration),
  });
};

export const createFullscreenLongBreak = async (): Promise<void> => {
  await createFullscreenBreak({
    message: breakMessage.getLongBreakMessage(),
    timeout: secondsToMilliseconds(settingState.settings.longBreakDuration),
  });
};
