import { MenuItem } from '@tauri-apps/api/menu/menuItem';
import { currentWindow } from '@/core/window';

const quitItem = await MenuItem.new({
  id: 'quit',
  text: 'Quit',
  action: async (): Promise<void> => {
    await currentWindow.destroy();
  }
});

export default quitItem;
