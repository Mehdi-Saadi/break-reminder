import { useUpdaterStore } from '@/stores/updater.ts';
import { useEventListener } from '@vueuse/core';

export const checkForUpdatesOnOnline = (): void => {
  const { checkForUpdates } = useUpdaterStore();

  useEventListener('online', checkForUpdates);
};
