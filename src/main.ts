import ViewManager from '@/modules/setting/ViewManager.ts';
import browserShortcut from '@/shared/browserShortcut';
import '@/modules/window';
import '@/modules/timer';
import '@/modules/updater';
import '@/modules/autostart';
import '@/modules/tray';

browserShortcut.disableAllInProd();

const app = document.getElementById('app');
if (app) {
  new ViewManager().mount(app);
}
