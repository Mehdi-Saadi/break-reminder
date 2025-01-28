import { availableMonitors, Window } from '@tauri-apps/api/window';
import { generateRandomAlphabeticId } from '@/shared/crypto';

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

const func = async (): Promise<void> => {
  const monitors = await availableMonitors();

  for (const monitor of monitors) {
    const windowUniqueLabel = `break-reminder-${generateRandomAlphabeticId()}`;

    const breakWindow = new Window(windowUniqueLabel, {
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
      console.log(`Window created: ${windowUniqueLabel} at ${monitor.position.x}, ${monitor.position.y}`);

      // Wait a bit to ensure the window is fully rendered before closing
      setTimeout(async () => {
        await breakWindow.destroy();
        console.log(`Window ${windowUniqueLabel} closed`);
      }, 5000);
    });

    await breakWindow.once('tauri://error', (error) => {
      console.error(`Error creating window ${windowUniqueLabel}:`, error);
    });
  }
};
