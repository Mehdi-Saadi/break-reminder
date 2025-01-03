import SidebarNavigationButton from '@/common/ui/buttons/SidebarNavigationButton.ts';
import icon from '@/common/ui/icons.ts';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(
      icon('gear', 'size-5 me-1.5'),
      'Settings'
    )
  }
}

export default SidebarSettingButton;
