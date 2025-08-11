import { defaultWindowIcon } from '@tauri-apps/api/app';
import { Menu } from '@tauri-apps/api/menu/menu';
import { MenuItem } from '@tauri-apps/api/menu/menuItem';
import { TrayIcon } from '@tauri-apps/api/tray';
import { getCurrentWindow } from '@tauri-apps/api/window';

export const useTray = () => {
  const TRAY_ID = 'break-reminder-tray';
  const currentWindow = getCurrentWindow();

  const createTrayMenuItems = async (): Promise<MenuItem[]> => [
    // show settings
    await MenuItem.new({
      id: 'show-break-reminder-app',
      text: 'Settings',
      action: (): Promise<void> => currentWindow.show(),
    }),
    // quit the app
    await MenuItem.new({
      id: 'quit-break-reminder-app',
      text: 'Quit',
      action: (): Promise<void> => currentWindow.destroy(),
    }),
  ];

  const createTrayMenu = async (): Promise<Menu> => Menu.new({
      id: 'break-reminder-tray-menu',
      items: await createTrayMenuItems(),
    });

  const createTray = async (): Promise<TrayIcon> => TrayIcon.new({
      id: TRAY_ID,
      icon: await defaultWindowIcon() || undefined,
      menu: await createTrayMenu(),
      tooltip: 'Break Reminder',
      showMenuOnLeftClick: false,
    });

  const getOrCreateTray = async (): Promise<TrayIcon> => {
    const tray = await TrayIcon.getById(TRAY_ID);

    if (tray) {
      return tray;
    }

    return createTray();
  };

  return {
    getOrCreateTray,
  };
};
