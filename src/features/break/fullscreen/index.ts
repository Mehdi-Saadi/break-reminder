import { availableMonitors } from '@tauri-apps/api/window';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

const createBreakWebviewWindow = (x?: number, y?: number): WebviewWindow => {
  const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`;

  return new WebviewWindow(windowUniqueLabel, {
    x: x,
    y: y,
    maximized: true,
    decorations: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    focus: true,
    visible: false,
    url: '/src/features/break/fullscreen/views/index.html',
    backgroundColor: '#000000',
  });
};

const createFullscreenBreakForAllMonitors = async (
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

export default createFullscreenBreakForAllMonitors;
