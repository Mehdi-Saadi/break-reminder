import ViewManager from '@/features/setting/ViewManager.ts';
import '@/app/window';
import '@/features/tray';

const app = document.getElementById('app');
if (app) {
  new ViewManager().mount(app);
}
