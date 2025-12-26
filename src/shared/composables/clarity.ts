import Clarity from '@microsoft/clarity'

const SAMPLE_USER_ID = String(Math.round(Math.random() * 1000))

export function useClarity() {
  const CLARITY_ID = import.meta.env.VITE_CLARITY_ID

  function init() {
    Clarity.init(CLARITY_ID)
  }

  function identify() {
    Clarity.identify(SAMPLE_USER_ID)
  }

  return {
    init,
    identify,
  }
}
