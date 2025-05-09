import CheckboxField from '@/modules/setting/components/fields/CheckboxField.ts';
import LabelledSettingItem from '@/modules/setting/components/LabelledSettingItem.ts';
import SettingItem from '@/modules/setting/components/SettingItem.ts';
import { IconName } from '@/shared/ui/icons.ts';

class CheckboxSettingItem extends LabelledSettingItem {
  constructor(
    label: string,
    caption: string,
    iconName: IconName,
    private initialState: boolean,
    private onChange: (newValue: boolean) => void
  ) {
    super(label, caption, iconName);
  }

  create(): SettingItem {
    const item = new SettingItem();

    const labelWrapper = this.createLabelContent();
    item.labelContainer.appendChild(labelWrapper);

    const checkbox = new CheckboxField(this.onChange, this.initialState);
    item.addChild(checkbox);
    checkbox.mount(item.buttonContainer);

    return item;
  }
}

export default CheckboxSettingItem;
