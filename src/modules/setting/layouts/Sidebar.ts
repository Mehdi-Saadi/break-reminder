import Component from '@/shared/ui/base/Component.ts';
import SidebarAboutButton from '@/modules/setting/components/buttons/SidebarAboutButton.ts';
import SidebarBehaviorButton from '@/modules/setting/components/buttons/SidebarBehaviorButton.ts';
import SidebarGeneralButton from '@/modules/setting/components/buttons/SidebarGeneralButton.ts';
import SidebarNotificationAlertButton from '@/modules/setting/components/buttons/SidebarNotificationAlertButton.ts';
import SidebarBreakMessagesButton from '@/modules/setting/components/buttons/SidebarBreakMessagesButton.ts';
import SidebarBreakScheduleButton from '@/modules/setting/components/buttons/SidebarBreakScheduleButton.ts';

class Sidebar extends Component {
  constructor() {
    super('div', 'h-full w-1/3 fixed bg-inherit p-5 flex flex-col justify-between');

    const mainButtonWrapper = document.createElement('div');
    mainButtonWrapper.setAttribute('class', 'space-y-1 w-full');

    new SidebarGeneralButton().mount(mainButtonWrapper);
    new SidebarBreakScheduleButton().mount(mainButtonWrapper);
    new SidebarBehaviorButton().mount(mainButtonWrapper);
    new SidebarNotificationAlertButton().mount(mainButtonWrapper);
    new SidebarBreakMessagesButton().mount(mainButtonWrapper);

    const aboutButtonWrapper = document.createElement('div');
    aboutButtonWrapper.setAttribute('class', 'w-full');

    new SidebarAboutButton().mount(aboutButtonWrapper);

    this.element.appendChild(mainButtonWrapper);
    this.element.appendChild(aboutButtonWrapper);
  }
}

export default Sidebar;
