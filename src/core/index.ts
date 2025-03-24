import ViewManager from '@/features/setting/ViewManager.ts';
import browserShortcut from '@/shared/browserShortcut';
import '@/features/window';
import '@/features/timer';
import '@/features/updater';
import '@/features/autostart';
import '@/features/tray';

browserShortcut.disableAllInProd();

const app = document.getElementById('app');
if (app) {
  new ViewManager().mount(app);
}
