import { availableMonitors } from '@tauri-apps/api/window';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

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

const createFullscreenBreak = async (
  onCreate: (win: WebviewWindow) => void
): Promise<void> => {
  const monitors = await availableMonitors();

  for (const monitor of monitors) {
    const breakWindow = createBreakWebviewWindow(monitor.position.x, monitor.position.y);

    await breakWindow.once('tauri://created', async () => {
      await breakWindow.show();

      onCreate(breakWindow);
    });

    await breakWindow.once('tauri://error', error => {
      console.error('Error while creating window:', breakWindow, error);
    });
  }
};

export default createFullscreenBreak;
