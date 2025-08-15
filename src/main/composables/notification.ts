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
      response: checkPermissionResp,
    } = await handlePromise(isPermissionGranted());

    if (checkPermissionResp) {
      return true;
    }

    const {
      response: requestPermissionResp,
    } = await handlePromise(requestPermission());

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

  return {
    notify,
  };
};
