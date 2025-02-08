import { promiseHandler } from '@/shared/promise';
import { check } from '@tauri-apps/plugin-updater';

const installUpdateIfAvailable = async (): Promise<void> => {
  const [checkError, update] = await promiseHandler(check());

  if (checkError) {
    alert('There was an error while checking for updates..');
    console.error(checkError);
    return;
  }

  if (!update) {
    return;
  }

  const [downloadAndInstallError] = await promiseHandler(update.downloadAndInstall());

  if (downloadAndInstallError) {
    alert('There was an error while downloading updates..');
    console.error(downloadAndInstallError);
  }
};

installUpdateIfAvailable();
