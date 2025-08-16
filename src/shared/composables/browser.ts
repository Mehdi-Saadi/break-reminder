import { useEventListener } from '@vueuse/core'

export function useBrowser() {
  function disableContextmenuInProd(): void {
    if (import.meta.env.VITE_PRODUCTION === 'true') {
      useEventListener('contextmenu', event => event.preventDefault())
    }
  }

  return {
    disableContextmenuInProd,
  }
}
