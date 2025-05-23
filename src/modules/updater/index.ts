import { check, Update } from '@tauri-apps/plugin-updater';
import { promiseHandler } from '@/shared/promise';
import notify from '@/shared/notification';
import t from '@/modules/i18n';

class Updater {
  private newUpdate: Update | null = null;

  async checkForUpdate(): Promise<Update | null> {
    if (!this.newUpdate) {
      const [checkError, update] = await promiseHandler(check());

      if (checkError) {
        await notify(checkError.message);
      }

      this.newUpdate = update || null;
    }

    return this.newUpdate;
  }

  private checkForUpdateOnOnlineHandler = async (): Promise<void> => {
    const update = await this.checkForUpdate();

    if (update) {
      await notify({
        title: t('newVersionAvailable'),
        body: t('newVersionAvailableInfo'),
      });
    }

    window.removeEventListener('online', this.checkForUpdateOnOnlineHandler);
  };

  checkForUpdateOnOnline(): void {
    window.addEventListener('online', this.checkForUpdateOnOnlineHandler, { once: true });
  }

  async update(): Promise<void> {
    const update = await this.checkForUpdate();

    if (!update) {
      return;
    }

    const [error] = await promiseHandler(update.downloadAndInstall());

    if (error) {
      await notify(error.message);
    }
  }
}

const updater = new Updater();

export default updater;
