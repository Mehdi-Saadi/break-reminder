import { NAVIGATION_EVENTS, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarBreakMessagesButton extends SidebarNavigationButton {
  constructor() {
    super(
      icon('chatBubble', 'size-5 me-1.5'),
      'Break Messages'
    )
  }

  protected clickHandler(): void {
    pageNavEventBus.emit(NAVIGATION_EVENTS.BREAK_MESSAGES);
  }
}

export default SidebarBreakMessagesButton;
