import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import { NAVIGATION_PAGES } from '@/common/events.ts';
import icon from '@/common/ui/icons.ts';

class SidebarAdvancedButton extends SidebarNavigationButton {
  constructor() {
    super(
      NAVIGATION_PAGES.ADVANCED,
      icon('doubleArrowRight', 'size-5 me-1.5'),
      'Advanced',
    );
  }
}

export default SidebarAdvancedButton;
