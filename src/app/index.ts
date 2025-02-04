import ViewManager from '@/features/setting/ViewManager.ts';
import browserShortcut from '@/shared/browserShortcut';
import '@/app/window';
import '@/app/timer';
import '@/features/tray';

browserShortcut.disableAllInProd();

const app = document.getElementById('app');
if (app) {
  new ViewManager().mount(app);
}
