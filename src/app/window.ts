import { getCurrentWindow, availableMonitors, Window } from '@tauri-apps/api/window';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { UnlistenFn } from '@tauri-apps/api/event';

/**
 * Returns an unListenFn to remove listener.
 * 
 * Use this function once to prevent adding multiple close listeners
 */
const hideWindowOnCloseClick = async (): Promise<UnlistenFn> =>
  await getCurrentWindow()
    .onCloseRequested(
      async (event): Promise<void> => {
        event.preventDefault();
        await getCurrentWindow().hide();
      }
    );

hideWindowOnCloseClick();

const createBreakWindow = async (): Promise<void> => {
  const monitors = await availableMonitors();

  for (const monitor of monitors) {
    const windowName = `break-reminder-${generateRandomAlphabeticId()}`;

    const breakWindow = new Window(windowName, {
      x: monitor.position.x,
      y: monitor.position.y,
      maximized: true,
      decorations: true,
      alwaysOnTop: true,
      skipTaskbar: false,
      resizable: false,
      focus: true,
      backgroundColor: '#000000',  // Ensure black background
    });

    // Handle window creation
    await breakWindow.once('tauri://created', async () => {
      console.log(`Window created: ${windowName} at ${monitor.position.x}, ${monitor.position.y}`);

      // Wait a bit to ensure the window is fully rendered before closing
      setTimeout(async () => {
        await breakWindow.destroy();
        console.log(`Window ${windowName} closed`);
      }, 10000);
    });

    await breakWindow.once('tauri://error', (error) => {
      console.error(`Error creating window ${windowName}:`, error);
    });
  }
};

// createBreakWindow();
