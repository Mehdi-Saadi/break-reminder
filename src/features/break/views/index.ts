import BreakView from '@/features/break/views/BreakView';
const app = document.getElementById('app');

if (app) {
  new BreakView().mount(app);
}
