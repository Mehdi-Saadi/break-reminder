import BreakView from '@/features/break/fullscreen/window/views/BreakView';

const app = document.getElementById('app');

if (app) {
  new BreakView().mount(app);
}
