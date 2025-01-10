import Component from '@/common/ui/base/Component.ts';
import BreakMessageItem from '@/features/setting/components/BreakMessageItem.ts';
import SettingSection from '@/features/setting/components/SettingSection.ts';
import settingState from '@/core/state/SettingState.ts';
import { UUID } from '@/common/types';

class BreakMessagesPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    const section = new SettingSection('Short Breaks');

    for (const messageId in settingState.settings.shortBreakMessages) {
      const messageItem = new BreakMessageItem(messageId as UUID);
      section.addChild(messageItem);
      messageItem.mount(section.settingContainer);
    }

    this.addChild(section);
    section.mount(this);
  }
}

export default BreakMessagesPage;
