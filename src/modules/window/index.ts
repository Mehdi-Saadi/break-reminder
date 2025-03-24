import { getCurrentWindow } from '@tauri-apps/api/window';
import { UnlistenFn } from '@tauri-apps/api/event';

/**
 * Returns an unListenFn to remove listener.
 * 
 * Use this function once to prevent adding multiple close listeners
 */
const hideWindowOnClose = async (): Promise<UnlistenFn> =>
  await getCurrentWindow()
    .onCloseRequested(
      async (event): Promise<void> => {
        event.preventDefault();
        await getCurrentWindow().hide();
      }
    );

hideWindowOnClose();
