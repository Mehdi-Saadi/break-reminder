import { availableMonitors, Window } from '@tauri-apps/api/window';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { Webview } from '@tauri-apps/api/webview';

const createBreakWindow = (x?: number, y?: number): Window => {
  const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`;

  return new Window(windowUniqueLabel, {
    x: x,
    y: y,
    maximized: true,
    decorations: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: false,
    focus: true,
    backgroundColor: '#000000',
  });
};

const createBreakWebview = (breakWindow: Window): Webview => {
  const webviewUniqueLabel = `break-webview-${generateRandomAlphabeticId()}`;

  return new Webview(
    breakWindow,
    webviewUniqueLabel,
    {
      url: '/src/features/break/fullscreen/views/index.html',
      x: 0,
      y: 0,
      width: 400,
      height: 400,
      backgroundColor: '#000000',
    }
  );
};

const createBreakWebviewWindow = (x?: number, y?: number): [Window, Webview] => {
  const breakWindow = createBreakWindow(x, y);
  const breakWebview = createBreakWebview(breakWindow);

  return [breakWindow, breakWebview];
};

const createBreakWebViewWindowForAllMonitors = async (): Promise<void> => {
  const monitors = await availableMonitors();

  for (const monitor of monitors) {
    const [breakWindow, breakWebview] = createBreakWebviewWindow(monitor.position.x, monitor.position.y);

    // Handle webview creation
    await breakWindow.once('tauri://created', async () => {
      breakWindow.hide();
      console.log('window created!');

      setTimeout(async () => {
        await breakWindow.destroy();
        console.log('window destroyed', breakWindow);
      }, 5000);
    });

    await breakWindow.once('tauri://error', (error) => {
      console.error('Error while creating window:', breakWindow, error);
    });

    // Handle webview creation
    await breakWebview.once('tauri://created', async () => {
      console.log('webview created', breakWebview);
      breakWindow.show();
    });

    await breakWebview.once('tauri://error', (error) => {
      console.error('Error while creating webview:', breakWebview, error);
    });
  }
};

createBreakWebViewWindowForAllMonitors();
