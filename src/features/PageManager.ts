import { NAVIGATION_EVENTS, pageNavEventBus } from '@/common/events.ts';
import SettingsPage from '@/features/setting/pages/SettingsPage.ts';
import Layout from '@/common/ui/layout/Layout.ts';

class PageManager extends Layout {
  private settingsPage: SettingsPage;

  constructor() {
    super();

    this.settingsPage = new SettingsPage();

    // default page
    this.settingsPage.mount(this.pageContainer);

    pageNavEventBus.on(NAVIGATION_EVENTS.SETTINGS, () => {


      this.settingsPage.mount(this.pageContainer);
    });
    pageNavEventBus.on(NAVIGATION_EVENTS.BREAK_MESSAGES, () => {
      this.settingsPage.unmount();


    });
    pageNavEventBus.on(NAVIGATION_EVENTS.ADVANCED, () => {
      this.settingsPage.unmount();


    });
  }
}

export default PageManager;
