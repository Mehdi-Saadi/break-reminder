import { Command } from '@tauri-apps/plugin-shell';

const isFullscreenOrMaximized = async (): Promise<boolean> => {
  try {
    const activeWindowCmd = await Command.create('xdotool', ['getactivewindow']).execute();
    const windowId = activeWindowCmd.stdout.trim();

    if (!windowId) {
      return false;
    }

    const xpropCmd = await Command.create('xprop', ['-id', windowId]).execute();
    const output = xpropCmd.stdout;

    return output.includes('_NET_WM_STATE_FULLSCREEN') || output.includes('_NET_WM_STATE_MAXIMIZED_VERT');
  } catch (error) {
    console.error('Error checking fullscreen state:', error);
    return false;
  }
};

export default isFullscreenOrMaximized;
