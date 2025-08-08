import {
  Options,
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';


export const useNotification = () => {
  const toast = useToast();

  const checkPermission = async (): Promise<boolean> => {
    if (!(await isPermissionGranted())) {
      return (await requestPermission()) === 'granted';
    }
    return true;
  };

  const notify = async (options: Options | string): Promise<void> => {
    if (!(await checkPermission())) {
      const message: string = typeof options === 'string' ? options : options.title;

      toast.add({
        title: message,
        color: 'neutral',
      });

      return;
    }

    sendNotification(options);
  };

  return {
    notify,
  };
};
