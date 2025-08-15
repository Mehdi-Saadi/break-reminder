import { handlePromise } from '@/main/utils/promise';
import {
  Options,
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';

export const useNotification = () => {
  const toast = useToast();

  const checkPermission = async (): Promise<boolean> => {
    const {
      error: checkPermissionError,
      response: checkPermissionResp,
    } = await handlePromise(isPermissionGranted());

    if (checkPermissionError) {
      errorToast(checkPermissionError);
      return false;
    }

    if (checkPermissionResp) {
      return true;
    }

    const {
      error: requestPermissionError,
      response: requestPermissionResp,
    } = await handlePromise(requestPermission());

    if (requestPermissionError) {
      errorToast(requestPermissionError);
      return false;
    }

    return requestPermissionResp === 'granted';
  };

  const notify = async (options: Options | string): Promise<void> => {
    const permissionGranted = await checkPermission();

    if (permissionGranted) {
      sendNotification(options);
      return;
    }

    const message: string = typeof options === 'string' ? options : options.title;

    toast.add({
      title: message,
      color: 'neutral',
    });
  };

  const errorToast = (error: Error | string): void => {
    const msg = typeof error === 'string' ? error : error.message;

    toast.add({
      title: msg,
      color: 'error',
    });
  };

  return {
    notify,
    errorToast,
  };
};
