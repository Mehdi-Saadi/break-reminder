import Component from '@/shared/ui/base/Component.ts';
import BreakMessageItem from '@/modules/setting/components/BreakMessageItem.ts';
import SettingSection from '@/modules/setting/components/SettingSection.ts';
import settingState from '@/shared/state/setting';
import t from '@/modules/i18n';
import { BreakMessages } from '@/shared/types';
import { UUID } from '@/shared/crypto';

class BreakMessagesView extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    this.createMessageSection(t('shortBreaks'), settingState.value.shortBreakMessages);
    this.createMessageSection(t('longBreaks'), settingState.value.longBreakMessages);
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

export default BreakMessagesView;
