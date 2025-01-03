import { NAVIGATION_EVENTS, pageNavEventBus } from '@/common/events.ts';
import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(
      icon('gear', 'size-5 me-1.5'),
      'Settings'
    )
  }

  protected clickHandler(): void {
    pageNavEventBus.emit(NAVIGATION_EVENTS.SETTINGS);
  }
}

export default SidebarSettingButton;
