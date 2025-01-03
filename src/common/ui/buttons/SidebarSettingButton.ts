import { NAVIGATION_EVENTS, NAVIGATION_PAGES, NavigationPage, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(icon('gear', 'size-5 me-1.5'), 'Settings');

    // active default page
    this.setActive();
  }

  protected clickHandler(): void {
    pageNavEventBus.emit(NAVIGATION_EVENTS.NAVIGATE, NAVIGATION_PAGES.SETTINGS);
  }

  protected activeListener(): void {
    pageNavEventBus.on(NAVIGATION_EVENTS.NAVIGATE, (selectedPage: NavigationPage) => {
      if (selectedPage === NAVIGATION_PAGES.SETTINGS) {
        this.setActive();
      } else {
        this.setNotActive();
      }
    });
  }
}

export default SidebarSettingButton;
