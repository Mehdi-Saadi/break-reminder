import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import trayMenu from '@/features/tray/menu';

const TRAY_ID = 'break-reminder-tray';

const createTray = async (): Promise<TrayIcon> =>
  TrayIcon.new({
    id: TRAY_ID,
    icon: await defaultWindowIcon() || undefined,
    menu: await trayMenu,
    tooltip: 'Break Reminder',
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

const getTray = async (): Promise<TrayIcon> => {
  const tray = await TrayIcon.getById(TRAY_ID);

  if (tray) {
    return tray;
  }

  return createTray();
};

const tray = getTray();

export default tray;
