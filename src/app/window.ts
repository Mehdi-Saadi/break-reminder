import { getCurrentWindow } from '@tauri-apps/api/window';

// prevent user to close app by close button, instead hide the window
await getCurrentWindow()
  .onCloseRequested(
    async (event): Promise<void> => {
      event.preventDefault();
      await getCurrentWindow().hide();
    }
  );
