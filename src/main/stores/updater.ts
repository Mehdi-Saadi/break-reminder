import { useNotification } from '@/composables/notification.ts';
import { handlePromise } from '@/utils/promise.ts';
import { check, Update } from '@tauri-apps/plugin-updater';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUpdaterStore = defineStore('updater', () => {
  const { notify } = useNotification();

  const update = ref<Update | null>(null);
  const checkForUpdateLoading = ref(false);
  const updateAvailable = computed(() => update.value !== null);

  const downloadLoading = ref(false);

  const checkForUpdates = async (): Promise<void> => {
    checkForUpdateLoading.value = true;

    const { error, response } = await handlePromise(check());

    if (error) {
      await notify(error.message);
    }

    update.value = response;
    checkForUpdateLoading.value = false;
  };

  const checkAndNotifyUpdates = async (): Promise<void> => {
    await checkForUpdates();

    if (update.value) {
      await notify('A new version is available!');
    }
  };

  const downloadAndInstall = async (): Promise<void> => {
    if (!update.value) {
      return;
    }

    downloadLoading.value = true;

    const { error } = await handlePromise(update.value.downloadAndInstall());

    if (error) {
      await notify(error.message);
    }

    downloadLoading.value = false;
  };

  return {
    updateAvailable,
    checkForUpdateLoading,
    downloadLoading,

    checkForUpdates,
    checkAndNotifyUpdates,
    downloadAndInstall,
  };
});
