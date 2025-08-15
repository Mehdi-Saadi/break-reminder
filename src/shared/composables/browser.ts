import { useEventListener } from '@vueuse/core';

export const useBrowser = () => {
  const disableContextmenuInProd = (): void => {
    if (import.meta.env.VITE_PRODUCTION === 'true') {
      useEventListener('contextmenu', event => event.preventDefault());
    }
  };

  return {
    disableContextmenuInProd,
  };
};
