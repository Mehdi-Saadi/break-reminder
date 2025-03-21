import MessageField from '@/features/setting/components/fields/MessageField.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import SquareDeleteButton from '@/features/setting/components/buttons/SquareDeleteButton.ts';
import settingState from '@/shared/state/setting';
import { UUID } from '@/shared/crypto';

class BreakMessageItem extends SettingItem {
  constructor(messageId: UUID) {
    super();

    const messageInput = new MessageField(
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
