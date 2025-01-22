import MessageInput from '@/features/setting/components/MessageInput.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import SquareDeleteButton from '@/shared/ui/buttons/SquareDeleteButton.ts';
import settingState from '@/shared/state/SettingState.ts';
import { UUID } from '@/shared/types';

class BreakMessageItem extends SettingItem {
  constructor(messageId: UUID) {
    super();

    const messageInput = new MessageInput(
      newValue => settingState.updateBreakMessageById(messageId, newValue),
      settingState.getBreakMessageById(messageId),
    );
    this.addChild(messageInput);
    messageInput.mount(this.labelContainer);

    const deleteButton = new SquareDeleteButton(() => {
      settingState.removeBreakMessageById(messageId);
      this.unmount();
    });
    this.addChild(deleteButton);
    deleteButton.mount(this.buttonContainer);
  }
}

export default BreakMessageItem;
