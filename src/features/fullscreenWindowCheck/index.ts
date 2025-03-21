import isFullscreenOrMaximizedLinux from '@/features/fullscreenWindowCheck/linux';
import isFullscreenOrMaximizedMacOS from '@/features/fullscreenWindowCheck/macos';
import isFullscreenOrMaximizedWindows from '@/features/fullscreenWindowCheck/windows';
import { platform } from '@tauri-apps/plugin-os';

const isFullscreenOrMaximized = async (): Promise<boolean> => {
  switch (platform()) {
    case 'windows':
      return isFullscreenOrMaximizedWindows();
    case 'linux':
      return isFullscreenOrMaximizedLinux();
    case 'macos':
      return isFullscreenOrMaximizedMacOS();
    default:
      console.error('Platform specific command does not found');
      return false;
  }
};

export default isFullscreenOrMaximized;
