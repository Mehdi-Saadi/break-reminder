import { check, Update } from '@tauri-apps/plugin-updater';
import { promiseHandler } from '@/shared/promise';
import notify from '@/shared/notification';
import t from '@/modules/i18n';

class Updater {
  async checkForUpdate(): Promise<Update | null> {
    const [checkError, update] = await promiseHandler(check());

    if (checkError) {
      await notify(checkError.message);
      return null;
    }

    return update;
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
}

const updater = new Updater();

export default updater;
