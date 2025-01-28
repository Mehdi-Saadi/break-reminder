import { BREAK_WINDOW_EVENT, BreakWindowPayload } from '@/features/break/fullscreen/payload';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { availableMonitors } from '@tauri-apps/api/window';
import { secondsToMilliseconds } from '@/shared/time';
import breakMessage from '@/features/break/message';
import settingState from '@/shared/state/setting';

const createBreakWebviewWindow = (x?: number, y?: number): WebviewWindow => {
  const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`;

  return new WebviewWindow(windowUniqueLabel, {
    x: x,
    y: y,
    maximized: true,
    decorations: !import.meta.env.PROD,
    alwaysOnTop: true,
    skipTaskbar: import.meta.env.PROD,
    resizable: false,
    focus: true,
    visible: false,
    transparent: true,
    url: '/src/features/break/fullscreen/window/index.html',
  });
};

// todo
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
    const breakWindow = createBreakWebviewWindow(monitor.position.x, monitor.position.y);

    await breakWindow.once('tauri://created', async () => {
      await breakWindow.emit(BREAK_WINDOW_EVENT, breakWindowPayload);
    });

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
