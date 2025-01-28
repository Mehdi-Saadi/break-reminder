import BreakView from '@/features/fullscreenBreak/window/views/BreakView';

const app = document.getElementById('app');

if (app) {
  new BreakView().mount(app);
}
