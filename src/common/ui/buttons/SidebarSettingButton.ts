import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import { NAVIGATION_PAGES } from '@/common/events.ts';
import icon from '@/common/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(
      NAVIGATION_PAGES.SETTINGS,
      icon('gear', 'size-5 me-1.5'),
      'Settings',
    );

    // activate default page
    this.setActive();
  }
}

export default SidebarSettingButton;
