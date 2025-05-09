import AdvancedView from '@/modules/setting/views/AdvancedView.ts';
import BreakMessagesView from '@/modules/setting/views/BreakMessagesView.ts';
import GeneralView from '@/modules/setting/views/GeneralView.ts';
import Component from '@/shared/ui/base/Component.ts';
import Layout from '@/modules/setting/layouts/Layout.ts';
import SettingsView from '@/modules/setting/views/SettingsView.ts';
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
        case 'settings':
          this.currentPage = new SettingsView();
          break;
        case 'advanced':
          this.currentPage = new AdvancedView();
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
