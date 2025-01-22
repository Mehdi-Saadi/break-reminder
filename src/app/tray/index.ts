import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { currentWindow } from '@/app/window';
import trayMenu from '@/app/tray/menu';

const tray = await TrayIcon.new({
  id: 'break-reminder-tray',
  icon: await defaultWindowIcon() || undefined,
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
