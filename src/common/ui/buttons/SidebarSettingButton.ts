import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(
      'settings',
      icon('gear', 'size-5 me-1.5'),
      'Settings'
    );

    // active default page
    this.setActive();
  }
}

export default SidebarSettingButton;
