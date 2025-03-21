import linuxCommand from '@/features/fullscreenWindowCheck/linux';
import macosCommand from '@/features/fullscreenWindowCheck/macos';
import winCommand from '@/features/fullscreenWindowCheck/windows';
import { platform } from '@tauri-apps/plugin-os';

const isFullscreenOrMaximized = async (): Promise<boolean> => {
  switch (platform()) {
    case 'windows':
      return winCommand();
    case 'linux':
      return linuxCommand();
    case 'macos':
      return macosCommand();
    default:
      console.error('Platform specific command does not found');
      return false;
  }
};

export default isFullscreenOrMaximized;
