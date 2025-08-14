import { useUpdaterStore } from '@/main/stores/updater';
import { useEventListener } from '@vueuse/core';

export const useUpdater = () => {
  const { checkAndNotifyIfNewVersionAvailable } = useUpdaterStore();

  const checkForUpdatesOnOnline = async (): Promise<void> => {
    if (navigator.onLine) {
      await checkAndNotifyIfNewVersionAvailable();
    } else {
      useEventListener('online', checkAndNotifyIfNewVersionAvailable, { once: true });
    }
  };

  return {
    checkForUpdatesOnOnline,
  };
};
