import { useUpdaterStore } from '@/stores/updater.ts';
import { useEventListener } from '@vueuse/core';

export const useUpdater = () => {
  const { checkAndNotifyUpdates } = useUpdaterStore();

  const checkForUpdatesOnOnline = async (): Promise<void> => {
    if (navigator.onLine) {
      await checkAndNotifyUpdates();
    } else {
      useEventListener('online', checkAndNotifyUpdates, { once: true });
    }
  };

  return {
    checkForUpdatesOnOnline,
  };
};
