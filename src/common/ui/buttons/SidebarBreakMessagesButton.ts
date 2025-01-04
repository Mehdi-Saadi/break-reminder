import { NAVIGATION_PAGES, NavigationPage, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarBreakMessagesButton extends SidebarNavigationButton {
  constructor() {
    super(icon('chatBubble', 'size-5 me-1.5'), 'Break Messages');
  }

  protected clickHandler(): void {
    pageNavEventBus.emit('navigate', NAVIGATION_PAGES.BREAK_MESSAGES);
  }

  protected activeListener(): void {
    pageNavEventBus.on('navigate', (selectedPage: NavigationPage) => {
      if (selectedPage === NAVIGATION_PAGES.BREAK_MESSAGES) {
        this.setActive();
      } else {
        this.setNotActive();
      }
    });
  }
}

export default SidebarBreakMessagesButton;
