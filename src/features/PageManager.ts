import { NAVIGATION_EVENTS, NavigationPage, pageNavEventBus } from '@/common/events.ts';
import AdvancedPage from '@/features/setting/pages/AdvancedPage.ts';
import BreakMessagesPage from '@/features/setting/pages/BreakMessagesPage.ts';
import SettingsPage from '@/features/setting/pages/SettingsPage.ts';
import Layout from '@/common/ui/layout/Layout.ts';

class PageManager extends Layout {
  private settingsPage: SettingsPage;
  private breakMessagesPage: BreakMessagesPage;
  private advancedPage: AdvancedPage;

  constructor() {
    super();

    this.settingsPage = new SettingsPage();
    this.breakMessagesPage = new BreakMessagesPage();
    this.advancedPage = new AdvancedPage();

    // default active page
    this.settingsPage.mount(this.pageContainer);

    pageNavEventBus.on(NAVIGATION_EVENTS.NAVIGATE, (selectedPage: NavigationPage) => {
      this.unmountPages();

      switch (selectedPage) {
        case 'settings':
          this.settingsPage.mount(this.pageContainer);
          break;
        case 'break_messages':
          this.breakMessagesPage.mount(this.pageContainer);
          break;
        case 'advanced':
          this.advancedPage.mount(this.pageContainer);
          break;
      }
    });
  }

  private unmountPages(): void {
    this.settingsPage.unmount();
    this.breakMessagesPage.unmount();
    this.advancedPage.unmount();
  }
}

export default PageManager;
