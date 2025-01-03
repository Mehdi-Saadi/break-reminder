import { NAVIGATION_EVENTS, NAVIGATION_PAGES, NavigationPage, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarAdvancedButton extends SidebarNavigationButton {
  constructor() {
    super(icon('doubleArrowRight', 'size-5 me-1.5'), 'Advanced');
  }

  protected clickHandler(): void {
    pageNavEventBus.emit(NAVIGATION_EVENTS.NAVIGATE, NAVIGATION_PAGES.ADVANCED);
  }

  protected activeListener(): void {
    pageNavEventBus.on(NAVIGATION_EVENTS.NAVIGATE, (selectedPage: NavigationPage) => {
      if (selectedPage === NAVIGATION_PAGES.ADVANCED) {
        this.setActive();
      } else {
        this.setNotActive();
      }
    });
  }
}

export default SidebarAdvancedButton;
