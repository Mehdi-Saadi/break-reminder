import { useEventListener } from '@vueuse/core';
import { onMounted } from 'vue';

export const disableBrowserContextmenuInProd = (): void => {
  onMounted(() => {
    if (import.meta.env.VITE_PRODUCTION === 'true') {
      useEventListener('contextmenu', event => event.preventDefault());
    }
  });
};
