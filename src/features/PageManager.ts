import AdvancedView from '@/features/setting/views/AdvancedView.ts';
import BreakMessagesView from '@/features/setting/views/BreakMessagesView.ts';
import Component from '@/shared/ui/base/Component.ts';
import Layout from '@/shared/ui/layout/Layout.ts';
import SettingsView from '@/features/setting/views/SettingsView.ts';
import { NavigationPage, pageNavEventBus } from '@/shared/events.ts';

class PageManager extends Layout {
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

export default PageManager;
