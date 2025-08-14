import { useUpdaterStore } from '@/main/stores/updater';
import { useEventListener } from '@vueuse/core';

export const useUpdater = () => {
  const { checkAndNotify } = useUpdaterStore();

  const checkForUpdatesOnOnline = async (): Promise<void> => {
    if (navigator.onLine) {
      await checkAndNotify();
    } else {
      useEventListener('online', checkAndNotify, { once: true });
    }
  };

  return {
    checkForUpdatesOnOnline,
  };
};
