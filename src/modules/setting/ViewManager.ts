import NotificationAlertView from '@/modules/setting/views/NotificationAlertView.ts';
import BehaviorView from '@/modules/setting/views/BehaviorView.ts';
import BreakMessagesView from '@/modules/setting/views/BreakMessagesView.ts';
import GeneralView from '@/modules/setting/views/GeneralView.ts';
import Component from '@/shared/ui/base/Component.ts';
import Layout from '@/modules/setting/layouts/Layout.ts';
import BreakScheduleView from '@/modules/setting/views/BreakScheduleView.ts';
import { NavigationPage, pageNavEventBus } from '@/modules/setting/events/page';

class ViewManager extends Layout {
  private currentPage: Component;

  constructor() {
    super();

    this.currentPage = new GeneralView();
    this.displayPage();
    this.initNavigationEvents();
  }

  private initNavigationEvents(): void {
    pageNavEventBus.on('navigate', (selectedPage: NavigationPage) => {
      this.currentPage.unmount();

      switch (selectedPage) {
        case 'general':
          this.currentPage = new GeneralView();
          break;
        case 'break_schedule':
          this.currentPage = new BreakScheduleView();
          break;
        case 'behavior':
          this.currentPage = new BehaviorView();
          break;
        case 'notification':
          this.currentPage = new NotificationAlertView();
          break;
        case 'break_messages':
          this.currentPage = new BreakMessagesView();
          break;
      }

      this.displayPage();
    });
  }

  private displayPage(): void {
    this.currentPage.mount(this.pageContainer);
  }
}

export default ViewManager;
