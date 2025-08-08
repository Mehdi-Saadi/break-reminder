import { getCurrentWindow } from '@tauri-apps/api/window';

export const useWindow = () => {
  const hideOnClose = async (): Promise<void> => {
    await getCurrentWindow()
      .onCloseRequested(
        async (e): Promise<void> => {
          e.preventDefault();
          await getCurrentWindow().hide();
        }
      );
  };

  return {
    hideOnClose,
  };
};
