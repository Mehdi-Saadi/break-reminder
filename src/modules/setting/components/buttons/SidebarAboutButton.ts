import SidebarNavigationButton from '@/modules/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';
import t from '@/modules/i18n';

class SidebarAboutButton extends SidebarNavigationButton {
  constructor() {
    super(
      'about',
      icon('info', 'size-5 me-1.5'),
      t('aboutSoftware'),
    );
  }
}

export default SidebarAboutButton;
