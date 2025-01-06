import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import { NAVIGATION_PAGES } from '@/common/events.ts';
import icon from '@/common/ui/icons.ts';

class SidebarBreakMessagesButton extends SidebarNavigationButton {
  constructor() {
    super(
      NAVIGATION_PAGES.BREAK_MESSAGES,
      icon('chatBubble', 'size-5 me-1.5'),
      'Break Messages',
    );
  }
}

export default SidebarBreakMessagesButton;
