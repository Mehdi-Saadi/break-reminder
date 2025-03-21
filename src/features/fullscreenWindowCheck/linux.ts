import { Command } from '@tauri-apps/plugin-shell';

const isFullscreenOrMaximizedLinux = async (): Promise<boolean> => {
  try {
    // Check if xdotool and xprop are installed
    const checkCmd = await Command.create('which', ['xdotool']).execute();
    if (!checkCmd.stdout.trim()) {
      console.error('xdotool is not installed.');
      return false;
    }

    const activeWindowCmd = await Command.create('xdotool', ['getactivewindow']).execute();
    const windowId = activeWindowCmd.stdout.trim();

    if (!windowId) {
      console.error('No active window found.');
      return false;
    }

    const xpropCmd = await Command.create('xprop', ['-id', windowId]).execute();
    const output = xpropCmd.stdout;

    return (
      output.includes('_NET_WM_STATE_FULLSCREEN') ||
      output.includes('_NET_WM_STATE_MAXIMIZED_VERT') ||
      output.includes('_NET_WM_STATE_MAXIMIZED_HORZ')
    );
  } catch (error) {
    console.error('Error checking fullscreen state on Linux:', error);
    return false;
  }
};

export default isFullscreenOrMaximizedLinux;
