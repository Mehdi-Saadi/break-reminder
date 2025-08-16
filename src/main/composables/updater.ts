import { useEventListener } from '@vueuse/core'
import { useUpdaterStore } from '@/main/stores/updater'

export function useUpdater() {
  const { checkAndNotifyIfNewVersionAvailable } = useUpdaterStore()

  async function checkForUpdatesOnOnline(): Promise<void> {
    if (navigator.onLine) {
      await checkAndNotifyIfNewVersionAvailable()
    }
    else {
      useEventListener('online', checkAndNotifyIfNewVersionAvailable, { once: true })
    }
  }

  return {
    checkForUpdatesOnOnline,
  }
}
