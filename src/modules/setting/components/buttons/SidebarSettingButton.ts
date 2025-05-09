import SidebarNavigationButton from '@/modules/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';
import t from '@/modules/i18n';

class SidebarSettingButton extends SidebarNavigationButton {
  constructor() {
    super(
      'settings',
      icon('gear', 'size-5 me-1.5'),
      t('settings'),
    );
  }
}

export default SidebarSettingButton;
