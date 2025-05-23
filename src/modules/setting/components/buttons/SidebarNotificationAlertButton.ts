import SidebarNavigationButton from '@/modules/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';
import t from '@/modules/i18n';

class SidebarNotificationAlertButton extends SidebarNavigationButton {
  constructor() {
    super(
      'notification',
      icon('notifications', 'size-5 me-1.5'),
      t('notificationsAndAlerts'),
    );
  }
}

export default SidebarNotificationAlertButton;
