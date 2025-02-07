import { check } from '@tauri-apps/plugin-updater';

const installUpdateIfAvailable = async (): Promise<void> => {
  const update = await check();

  if (!update) {
    return;
  }

  await update.downloadAndInstall();
};

installUpdateIfAvailable();
