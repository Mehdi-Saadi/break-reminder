import quitItem from '@/features/tray/menu/items/quit.ts';
import { Menu } from '@tauri-apps/api/menu/menu';

const createTrayMenu = async (): Promise<Menu> =>
  Menu.new({
    id: 'tray-menu',
    items: [
      await quitItem,
    ]
  });

const trayMenu = createTrayMenu();

export default trayMenu;
