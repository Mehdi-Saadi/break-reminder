import SidebarBehaviorButton from '@/modules/setting/components/buttons/SidebarBehaviorButton.ts';
import SidebarGeneralButton from '@/modules/setting/components/buttons/SidebarGeneralButton.ts';
import Component from '@/shared/ui/base/Component.ts';
import SidebarNotificationAlertButton from '@/modules/setting/components/buttons/SidebarNotificationAlertButton.ts';
import SidebarBreakMessagesButton from '@/modules/setting/components/buttons/SidebarBreakMessagesButton.ts';
import SidebarBreakScheduleButton from '@/modules/setting/components/buttons/SidebarBreakScheduleButton.ts';

class Sidebar extends Component {
  constructor() {
    super('div', 'h-full w-1/3 fixed top-0 start-0 bg-inherit p-5 space-y-1');

    new SidebarGeneralButton().mount(this);
    new SidebarBreakScheduleButton().mount(this);
    new SidebarBehaviorButton().mount(this);
    new SidebarNotificationAlertButton().mount(this);
    new SidebarBreakMessagesButton().mount(this);
  }
}

export default Sidebar;
