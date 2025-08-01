import {
  Options,
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';

const checkPermission = async (): Promise<boolean> => {
  if (!(await isPermissionGranted())) {
    return (await requestPermission()) === 'granted';
  }
  return true;
};

export const notify = async (options: Options | string): Promise<void> => {
  if (!(await checkPermission())) {
    const message: string = typeof options === 'string' ? options : options.title;

    return alert(message);
  }

  sendNotification(options);
};
