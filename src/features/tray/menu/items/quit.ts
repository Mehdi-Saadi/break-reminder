import { getCurrentWindow } from '@tauri-apps/api/window';
import { MenuItem } from '@tauri-apps/api/menu/menuItem';

const quitItem = MenuItem.new({
  id: 'quit',
  text: 'Quit',
  action: async (): Promise<void> => {
    await getCurrentWindow().destroy();
  }
});

export default quitItem;
