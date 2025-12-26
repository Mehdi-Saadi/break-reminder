import type { Update } from '@tauri-apps/plugin-updater'
import { check } from '@tauri-apps/plugin-updater'
import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import { useNotification } from '@/main/composables/notification'
import { handlePromise } from '@/main/utils/promise'
import { useT } from '@/shared/composables/t'

export const useUpdaterStore = defineStore('updater', () => {
  const { notify } = useNotification()
  const { t } = useT()

  const checkForUpdateLoading = ref(false)
  const updateAvailable = ref(false)
  const downloadLoading = ref(false)
  let update: Update | null = null

  async function checkAndNotifyIfNewVersionAvailable(): Promise<void> {
    checkForUpdateLoading.value = true

    const { error, response } = await handlePromise(check())

    if (error) {
      await notify(error.message)
    }

    update = response

    updateAvailable.value = !!update

    if (update) {
      await notify({
        title: t('newVersionAvailable'),
        body: t('newVersionAvailableInfo'),
      })
    }

    checkForUpdateLoading.value = false
  }

  async function checkAndNotify(): Promise<void> {
    await checkAndNotifyIfNewVersionAvailable()

    if (!update) {
      await notify(t('youAreUsingTheLatestVersion'))
    }
  }

  async function downloadAndInstall(): Promise<void> {
    if (!update || downloadLoading.value) {
      return
    }

    downloadLoading.value = true

    const { error } = await handlePromise(update.downloadAndInstall())

    if (error) {
      await notify(error.message)
    }

    downloadLoading.value = false
  }

  return {
    updateAvailable: readonly(updateAvailable),
    checkForUpdateLoading: readonly(checkForUpdateLoading),
    downloadLoading: readonly(downloadLoading),

    checkAndNotifyIfNewVersionAvailable,
    checkAndNotify,
    downloadAndInstall,
  }
})
