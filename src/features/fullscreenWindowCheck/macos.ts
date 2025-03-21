import { Command } from '@tauri-apps/plugin-shell';

const isFullscreenOrMaximizedMacOS = async (): Promise<boolean> => {
  try {
    const cmd = Command.create('osascript', [
      '-e',
      `
      tell application "System Events"
        set frontApp to name of first application process whose frontmost is true
        tell application frontApp
          try
            if (count of windows) > 0 then
              set isFullscreen to window 1's fullscreen
              set isZoomed to window 1's zoomed
              return (isFullscreen or isZoomed)
            else
              return false
            end if
          on error
            return false
          end try
        end tell
      end tell
      `,
    ]);

    const output = await cmd.execute();
    return output.stdout.trim().toLowerCase() === 'true';
  } catch (error) {
    console.error('Error checking fullscreen state on macOS:', error);
    return false;
  }
};

export default isFullscreenOrMaximizedMacOS;
