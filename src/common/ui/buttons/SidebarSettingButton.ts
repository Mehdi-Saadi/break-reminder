import { NAVIGATION_PAGES, NavigationPage, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(icon('gear', 'size-5 me-1.5'), 'Settings');

    // active default page
    this.setActive();
  }

  protected clickHandler(): void {
    pageNavEventBus.emit('navigate', NAVIGATION_PAGES.SETTINGS);
  }

  protected activeListener(): void {
    pageNavEventBus.on('navigate', (selectedPage: NavigationPage) => {
      if (selectedPage === NAVIGATION_PAGES.SETTINGS) {
        this.setActive();
      } else {
        this.setNotActive();
      }
    });
  }
}

export default SidebarSettingButton;
