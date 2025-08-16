import type { Monitor } from '@tauri-apps/api/window'
import type { BreakWindowPayload } from '@/shared/types/break'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { availableMonitors } from '@tauri-apps/api/window'
import { storeToRefs } from 'pinia'
import { useBreakMessage } from '@/main/composables/breakMessage'
import { useSettingStore } from '@/main/stores/setting'
import { generateRandomAlphabeticId } from '@/main/utils/crypto'
import { objectToQuery } from '@/main/utils/url'

interface WebviewWindowParams {
  monitor: Monitor
  query: BreakWindowPayload
}

export function useFullscreenBreak() {
  const { getShortBreakMessage, getLongBreakMessage } = useBreakMessage()
  const { settings } = storeToRefs(useSettingStore())

  // TODO: show break message only for largest monitor
  // const getLargestOrFirstMonitor = async (): Promise<Monitor> => {
  //   const monitors = await availableMonitors();
  //
  //   return monitors.reduce((previousMonitor, currentMonitor) => {
  //     if (previousMonitor.scaleFactor === currentMonitor.scaleFactor) {
  //       return previousMonitor;
  //     }
  //     if (previousMonitor.scaleFactor > currentMonitor.scaleFactor) {
  //       return previousMonitor;
  //     }
  //     return currentMonitor;
  //   });
  // };

  function createWebviewWindow(
    params: WebviewWindowParams,
  ): WebviewWindow {
    const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`
    const queryParams = params.query ? objectToQuery(params.query) : ''

    const IN_PRODUCTION = import.meta.env.VITE_PRODUCTION === 'true'

    return new WebviewWindow(windowUniqueLabel, {
      x: params.monitor.position.x,
      y: params.monitor.position.y,
      fullscreen: IN_PRODUCTION,
      decorations: !IN_PRODUCTION,
      alwaysOnTop: IN_PRODUCTION,
      skipTaskbar: IN_PRODUCTION,
      resizable: !IN_PRODUCTION,
      focus: IN_PRODUCTION,
      visible: false,
      transparent: true,
      url: `/src/break/index.html${queryParams}`,
    })
  }

  async function createFullscreenBreak(
    breakWindowPayload: BreakWindowPayload,
  ): Promise<void> {
    const monitors = await availableMonitors()

    for (const monitor of monitors) {
      const breakWindow = createWebviewWindow({
        monitor,
        query: breakWindowPayload,
      })

      await breakWindow.once('tauri://created', (): Promise<void> => breakWindow.show())

      await breakWindow.once('tauri://error', (error) => {
        console.error('Error while creating window:', breakWindow, error)
      })
    }
  }

  async function createShortBreakWindow(): Promise<void> {
    await createFullscreenBreak({
      message: getShortBreakMessage(),
      timeout: settings.value.shortBreakDuration,
      showSkipBtn: !settings.value.strictBreak,
      showPostponeBtn: settings.value.allowPostponingBreaks,
      language: settings.value.language,
    })
  }

  async function createLongBreakWindow(): Promise<void> {
    await createFullscreenBreak({
      message: getLongBreakMessage(),
      timeout: settings.value.longBreakDuration,
      showSkipBtn: !settings.value.strictBreak,
      showPostponeBtn: settings.value.allowPostponingBreaks,
      language: settings.value.language,
    })
  }

  return {
    createShortBreakWindow,
    createLongBreakWindow,
  }
}
