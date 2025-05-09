import SidebarNavigationButton from '@/modules/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';
import t from '@/modules/i18n';

class SidebarGeneralButton extends SidebarNavigationButton {
  constructor() {
    super(
      'general',
      icon('gear', 'size-5 me-1.5'),
      t('general'),
    );

    // activate default page
    this.setActive();
  }
}

export default SidebarGeneralButton;
