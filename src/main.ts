import ViewManager from '@/features/setting/ViewManager.ts';

const app = document.getElementById('app');

if (app) {

  new ViewManager().mount(app);

}

// app scripts
import '@/app';
