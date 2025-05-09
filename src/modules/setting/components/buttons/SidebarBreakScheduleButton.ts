import SidebarNavigationButton from '@/modules/setting/components/buttons/SidebarNavigationButton.ts';
import icon from '@/shared/ui/icons.ts';
import t from '@/modules/i18n';

class SidebarBreakScheduleButton extends SidebarNavigationButton {
  constructor() {
    super(
      'break_schedule',
      icon('timer', 'size-5 me-1.5'),
      t('breakSchedule'),
    );
  }
}

export default SidebarBreakScheduleButton;
