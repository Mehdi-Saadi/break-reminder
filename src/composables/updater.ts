import { useUpdaterStore } from '@/stores/updater.ts';
import { useEventListener } from '@vueuse/core';

export const useUpdater = () => {
  const { checkForUpdates } = useUpdaterStore();

  const checkForUpdatesOnOnline = (): void => {
    useEventListener('online', checkForUpdates, { once: true });
  };

  return {
    checkForUpdatesOnOnline,
  };
};
