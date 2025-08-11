import { defaultWindowIcon } from '@tauri-apps/api/app';
import { Menu, MenuItem, PredefinedMenuItem } from '@tauri-apps/api/menu';
import { TrayIcon } from '@tauri-apps/api/tray';
import { getCurrentWindow } from '@tauri-apps/api/window';

export const useTray = () => {
  const TRAY_ID = 'break-reminder-tray';
  const TRAY_STATUS_ITEM_ID = 'break-reminder-tray-status-item';
  const currentWindow = getCurrentWindow();

  const createMenuItems = async (): Promise<(MenuItem | PredefinedMenuItem)[]> => [
    await MenuItem.new({
      id: TRAY_STATUS_ITEM_ID,
      text: 'Next break in: 13:58',
    }),
    await MenuItem.new({
      text: 'Settings',
      action: (): Promise<void> => currentWindow.show(),
    }),
    await PredefinedMenuItem.new({
      text: 'separator',
      item: 'Separator',
    }),
    await MenuItem.new({
      text: 'Quit',
      action: (): Promise<void> => currentWindow.destroy(),
    }),
  ];

  const createMenu = async (): Promise<Menu> => Menu.new({
      items: await createMenuItems(),
    });

  const create = async (): Promise<TrayIcon> => TrayIcon.new({
      id: TRAY_ID,
      icon: await defaultWindowIcon() || undefined,
      menu: await createMenu(),
      tooltip: 'Break Reminder',
      showMenuOnLeftClick: false,
    });

  const getOrCreate = async (): Promise<TrayIcon> => {
    const tray = await TrayIcon.getById(TRAY_ID);

    if (tray) {
      return tray;
    }

    return create();
  };

  return {
    getOrCreate,
  };
};
