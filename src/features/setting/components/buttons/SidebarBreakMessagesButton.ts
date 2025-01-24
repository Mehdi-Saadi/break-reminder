import SidebarNavigationButton from '@/features/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';

class SidebarBreakMessagesButton extends SidebarNavigationButton {
  constructor() {
    super(
      'break_messages',
      icon('chatBubble', 'size-5 me-1.5'),
      'Break Messages',
    );
  }
}

export default SidebarBreakMessagesButton;
