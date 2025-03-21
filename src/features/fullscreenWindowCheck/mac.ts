import { Command } from '@tauri-apps/plugin-shell';

const isFullscreenOrMaximized = async (): Promise<boolean> => {
  try {
    const cmd = Command.create('osascript', [
      '-e',
      `
      tell application "System Events"
        set frontApp to name of first application process whose frontmost is true
        tell application frontApp
          try
            return window 1's fullscreen
          on error
            return false
          end try
        end tell
      end tell
      `,
    ]);

    const output = await cmd.execute();
    return output.stdout.trim() === 'true';
  } catch (error) {
    console.error('Error checking fullscreen state:', error);
    return false;
  }
};

export default isFullscreenOrMaximized;
