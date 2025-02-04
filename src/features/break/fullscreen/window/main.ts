import BreakView from '@/features/break/fullscreen/window/views/BreakView';
import browserShortcut from '@/shared/browserShortcut';

browserShortcut.disableAllInProd();

const app = document.getElementById('app');

if (app) {
  new BreakView().mount(app);
}
