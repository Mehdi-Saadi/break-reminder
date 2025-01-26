import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import trayMenu from '@/features/tray/menu';

const createTray = async (): Promise<TrayIcon> =>
  TrayIcon.new({
    id: 'break-reminder-tray',
    icon: await defaultWindowIcon() || undefined,
    menu: await trayMenu,
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

const tray = createTray();

export default tray;
