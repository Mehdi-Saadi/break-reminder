import { NAVIGATION_EVENTS, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarAdvancedButton extends SidebarNavigationButton {
  constructor() {
    super(
      icon('doubleArrowRight', 'size-5 me-1.5'),
      'Advanced'
    )
  }

  protected clickHandler(): void {
    pageNavEventBus.emit(NAVIGATION_EVENTS.ADVANCED);
  }
}

export default SidebarAdvancedButton;
