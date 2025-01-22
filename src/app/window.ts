import { getCurrentWindow } from '@tauri-apps/api/window';

export const currentWindow = getCurrentWindow();

export const unListenCloseRequest = await currentWindow
  .onCloseRequested(
    async (event): Promise<void> => {
      event.preventDefault();
      await currentWindow.hide();
    }
  );
