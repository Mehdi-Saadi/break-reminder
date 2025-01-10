import settingState from '@/core/state/SettingState.ts'
import MessageInput from '@/features/setting/components/MessageInput.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import { UUID } from '@/common/types';

class BreakMessageItem extends SettingItem {
  constructor(messageId: UUID) {
    super();

    const messageInput = new MessageInput(
      newValue => settingState.updateBreakMessageById(messageId, newValue),
      settingState.getBreakMessageById(messageId),
    );
    this.addChild(messageInput);
    messageInput.mount(this.labelContainer);


  }
}

export default BreakMessageItem;
