import { defaultWindowIcon } from '@tauri-apps/api/app'
import { Menu, MenuItem, PredefinedMenuItem } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'
import { getCurrentWindow } from '@tauri-apps/api/window'
import moment from 'moment'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/main/stores/setting'

export function useTray() {
  const { settings } = storeToRefs(useSettingStore())
  const currentWindow = getCurrentWindow()

  const TRAY_ID = 'break-reminder-tray'

  async function createMenuItems(): Promise<(MenuItem | PredefinedMenuItem)[]> {
    const nextBreakTime = moment().add(settings.value.workDuration, 'minutes').format('h:mm A')

    return [
      await MenuItem.new({
        text: `Next break at: ${nextBreakTime}`,
        enabled: false,
      }),
      await PredefinedMenuItem.new({
        text: 'separator',
        item: 'Separator',
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
    ]
  }

  async function createMenu(): Promise<Menu> {
    return Menu.new({
      items: await createMenuItems(),
    })
  }

  async function create(): Promise<TrayIcon> {
    return TrayIcon.new({
      id: TRAY_ID,
      icon: await defaultWindowIcon() || undefined,
      menu: await createMenu(),
      tooltip: 'Break Reminder',
    })
  }

  async function getOrCreate(): Promise<TrayIcon> {
    const tray = await TrayIcon.getById(TRAY_ID)

    if (tray) {
      return tray
    }

    return create()
  }

  async function updateNextBreakTime() {
    const tray = await getOrCreate()

    tray.setMenu(await createMenu())
  }

  return {
    getOrCreate,
    updateNextBreakTime,
  }
}
