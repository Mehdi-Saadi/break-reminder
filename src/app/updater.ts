import { check } from '@tauri-apps/plugin-updater';

const installUpdateIfAvailable = async (): Promise<void> => {
  try {
    const update = await check();

    if (!update) {
      return;
    }

    try {
      await update.downloadAndInstall();
    } catch (error) {
      alert('There was an error while downloading updates..');
      console.error(error);
    }
  } catch (error) {
    alert('There was an error while checking updates..');
    console.error(error);
  }
};

installUpdateIfAvailable();
