import { getCurrentWindow } from '@tauri-apps/api/window'

export function useWindow() {
  async function hideOnClose(): Promise<void> {
    const currentWindow = getCurrentWindow()

    await currentWindow.onCloseRequested(
      async (e): Promise<void> => {
        e.preventDefault()
        await currentWindow.hide()
      },
    )
  }

  return {
    hideOnClose,
  }
}
