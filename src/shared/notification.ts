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

const notify = async (options: Options | string): Promise<void> => {
  if (!(await checkPermission())) {
    return console.error('Can not send notifications. Access Denied.');
  }

  sendNotification(options);
};

export default notify;
