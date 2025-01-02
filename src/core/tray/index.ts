import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray';
import { currentWindow } from '@/core/window';
import trayMenu from '@/core/tray/menu';

const tray = await TrayIcon.new({
  id: 'break-reminder-tray',
  menu: trayMenu,
  tooltip: 'Break reminder',
  menuOnLeftClick: false,
  action: async (event: TrayIconEvent): Promise<void> => {
    if (
      event.type === 'Click' &&
      event.button === 'Left' &&
      event.buttonState === 'Up'
    ) {
      await currentWindow.show();
    }
  }
});

export default tray;
