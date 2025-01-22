import AdvancedPage from '@/features/setting/pages/AdvancedPage.ts';
import BreakMessagesPage from '@/features/setting/pages/BreakMessagesPage.ts';
import Component from '@/shared/ui/base/Component.ts';
import Layout from '@/shared/ui/layout/Layout.ts';
import SettingsPage from '@/features/setting/pages/SettingsPage.ts';
import { NavigationPage, pageNavEventBus } from '@/shared/events.ts';

class PageManager extends Layout {
  private currentPage: Component;

  constructor() {
    super();

    this.currentPage = new SettingsPage();
    this.displayPage();
    this.initNavigationEvents();
  }

  private initNavigationEvents(): void {
    pageNavEventBus.on('navigate', (selectedPage: NavigationPage) => {
      this.currentPage.unmount();

      switch (selectedPage) {
        case 'settings':
          this.currentPage = new SettingsPage();
          break;
        case 'break_messages':
          this.currentPage = new BreakMessagesPage();
          break;
        case 'advanced':
          this.currentPage = new AdvancedPage();
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
