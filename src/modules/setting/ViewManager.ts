import AdvancedView from '@/modules/setting/views/AdvancedView.ts';
import BreakMessagesView from '@/modules/setting/views/BreakMessagesView.ts';
import Component from '@/shared/ui/base/Component.ts';
import Layout from '@/modules/setting/layouts/Layout.ts';
import SettingsView from '@/modules/setting/views/SettingsView.ts';
import { NavigationPage, pageNavEventBus } from '@/shared/event/page.ts';

class ViewManager extends Layout {
  private currentPage: Component;

  constructor() {
    super();

    this.currentPage = new SettingsView();
    this.displayPage();
    this.initNavigationEvents();
  }

  private initNavigationEvents(): void {
    pageNavEventBus.on('navigate', (selectedPage: NavigationPage) => {
      this.currentPage.unmount();

      switch (selectedPage) {
        case 'settings':
          this.currentPage = new SettingsView();
          break;
        case 'break_messages':
          this.currentPage = new BreakMessagesView();
          break;
        case 'advanced':
          this.currentPage = new AdvancedView();
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
