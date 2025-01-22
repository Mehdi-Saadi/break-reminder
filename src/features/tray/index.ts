import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import trayMenu from '@/features/tray/menu';

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
      await getCurrentWindow().show();
    }
  }
});

export default tray;
