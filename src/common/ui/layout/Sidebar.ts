import Component from '@/common/ui/base/Component.ts';
import SidebarAdvancedButton from '@/common/ui/buttons/SidebarAdvancedButton.ts';
import SidebarBreakMessagesButton from '@/common/ui/buttons/SidebarBreakMessagesButton.ts';
import SidebarSettingButton from '@/common/ui/buttons/SidebarSettingButton.ts';

class Sidebar extends Component {
  constructor() {
    super('div', 'h-full w-1/3 fixed top-0 start-0 bg-inherit p-5 space-y-1');

    new SidebarSettingButton().mount(this);
    new SidebarBreakMessagesButton().mount(this);
    new SidebarAdvancedButton().mount(this);
  }
}

export default Sidebar;
