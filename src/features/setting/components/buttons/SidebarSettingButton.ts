import SidebarNavigationButton from '@/features/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(
      'settings',
      icon('gear', 'size-5 me-1.5'),
      'Settings',
    );

    // activate default page
    this.setActive();
  }
}

export default SidebarSettingButton;
