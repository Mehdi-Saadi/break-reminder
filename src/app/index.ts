import ViewManager from '@/features/setting/ViewManager.ts';
import '@/app/browserShortcusts';
import '@/app/window';
import '@/app/timer';
import '@/features/tray';

const app = document.getElementById('app');
if (app) {
  new ViewManager().mount(app);
}
