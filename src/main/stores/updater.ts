import type { Update } from '@tauri-apps/plugin-updater'
import { check } from '@tauri-apps/plugin-updater'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useNotification } from '@/main/composables/notification'
import { handlePromise } from '@/main/utils/promise'
import { useT } from '@/shared/composables/t'

export const useUpdaterStore = defineStore('updater', () => {
  const { notify } = useNotification()
  const t = useT()

  const update = ref<Update | null>(null)
  const checkForUpdateLoading = ref(false)
  const updateAvailable = computed(() => update.value !== null)

  const downloadLoading = ref(false)

  async function checkAndNotifyIfNewVersionAvailable(): Promise<void> {
    checkForUpdateLoading.value = true

    const { error, response } = await handlePromise(check())

    if (error) {
      await notify(error.message)
    }

    update.value = response

    if (update.value) {
      await notify({
        title: t('newVersionAvailable'),
        body: t('newVersionAvailableInfo'),
      })
    }

    checkForUpdateLoading.value = false
  }

  async function checkAndNotify(): Promise<void> {
    await checkAndNotifyIfNewVersionAvailable()

    if (!update.value) {
      await notify(t('youAreUsingTheLatestVersion'))
    }
  }

  async function downloadAndInstall(): Promise<void> {
    if (!update.value) {
      return
    }

    downloadLoading.value = true

    const { error } = await handlePromise(update.value.downloadAndInstall())

    if (error) {
      await notify(error.message)
    }

    downloadLoading.value = false
  }

  return {
    updateAvailable,
    checkForUpdateLoading,
    downloadLoading,

    checkAndNotifyIfNewVersionAvailable,
    checkAndNotify,
    downloadAndInstall,
  }
})
