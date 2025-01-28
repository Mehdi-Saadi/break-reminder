import { availableMonitors } from '@tauri-apps/api/window';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

const createBreakWebviewWindow = (x?: number, y?: number): WebviewWindow => {
  const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`;

  return new WebviewWindow(windowUniqueLabel, {
    x: x,
    y: y,
    maximized: true,
    decorations: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    focus: true,
    visible: false,
    url: '/src/features/break/fullscreen/views/index.html',
    backgroundColor: '#000000',
  });
};

const createBreakWebViewWindowForAllMonitors = async (): Promise<void> => {
  const monitors = await availableMonitors();

  for (const monitor of monitors) {
    const breakWindow = createBreakWebviewWindow(monitor.position.x, monitor.position.y);

    // Handle webview creation
    await breakWindow.once('tauri://created', async () => {
      console.log('window created!');
      await breakWindow.show();

      setTimeout(async () => {
        await breakWindow.destroy();
        console.log('window destroyed', breakWindow);
      }, 5000);
    });

    await breakWindow.once('tauri://error', (error) => {
      console.error('Error while creating window:', breakWindow, error);
    });
  }
};

createBreakWebViewWindowForAllMonitors();
