import PageManager from '@/features/PageManager.ts';

const app = document.getElementById('app');

if (app) {

  new PageManager().mount(app);

}

// app scripts
import '@/app';
