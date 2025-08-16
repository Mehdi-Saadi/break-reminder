import type { Options } from '@tauri-apps/plugin-notification'
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification'
import { handlePromise } from '@/main/utils/promise'

export function useNotification() {
  const toast = useToast()

  async function checkPermission(): Promise<boolean> {
    const {
      error: checkPermissionError,
      response: checkPermissionResp,
    } = await handlePromise(isPermissionGranted())

    if (checkPermissionError) {
      errorToast(checkPermissionError)
      return false
    }

    if (checkPermissionResp) {
      return true
    }

    const {
      error: requestPermissionError,
      response: requestPermissionResp,
    } = await handlePromise(requestPermission())

    if (requestPermissionError) {
      errorToast(requestPermissionError)
      return false
    }

    return requestPermissionResp === 'granted'
  }

  async function notify(options: Options | string): Promise<void> {
    const permissionGranted = await checkPermission()

    if (permissionGranted) {
      sendNotification(options)
      return
    }

    const message: string = typeof options === 'string' ? options : options.title

    toast.add({
      title: message,
      color: 'neutral',
    })
  }

  function errorToast(error: Error | string): void {
    const msg = typeof error === 'string' ? error : error?.message || 'Unexpected Error!'

    toast.add({
      title: msg,
      color: 'error',
    })
  }

  return {
    notify,
  }
}
