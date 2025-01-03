import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarBreakMessagesButton extends SidebarNavigationButton {
  constructor() {
    super(
      'break_messages',
      icon('chatBubble', 'size-5 me-1.5'),
      'Break Messages'
    );
  }
}

export default SidebarBreakMessagesButton;
