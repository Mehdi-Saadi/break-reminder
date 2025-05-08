import SidebarNavigationButton from '@/modules/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';
import t from '@/modules/i18n';

class SidebarAdvancedButton extends SidebarNavigationButton {
  constructor() {
    super(
      'advanced',
      icon('doubleArrowRight', 'size-5 me-1.5'),
      t('advanced'),
    );
  }
}

export default SidebarAdvancedButton;
