import Component from '@/common/ui/base/Component.ts';
import BreakMessageItem from '@/features/setting/components/BreakMessageItem.ts';
import SettingSection from '@/features/setting/components/SettingSection.ts';
import settingState from '@/core/state/SettingState.ts';
import { BreakMessages, UUID } from '@/common/types';

class BreakMessagesPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    this.createMessageSection('Short Breaks', settingState.settings.shortBreakMessages);
    this.createMessageSection('Long Breaks', settingState.settings.longBreakMessages);
  }

  private createMessageSection(sectionLabel: string, breakMessages: BreakMessages): void {
    const section = new SettingSection(sectionLabel);

    for (const messageId in breakMessages) {
      const messageItem = new BreakMessageItem(messageId as UUID);
      section.addChild(messageItem);
      messageItem.mount(section.settingContainer);
    }

    this.addChild(section);
    section.mount(this);
  }
}

export default BreakMessagesPage;
