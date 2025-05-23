import ViewManager from '@/modules/setting/ViewManager.ts';
import browserShortcut from '@/shared/browserShortcut';
import updater from '@/modules/updater';
import '@/modules/window';
import '@/modules/timer';
import '@/modules/autostart';
import '@/modules/tray';

browserShortcut.disableAllInProd();
updater.checkForUpdateOnOnline();

const app = document.getElementById('app');
if (app) {
  new ViewManager().mount(app);
}
