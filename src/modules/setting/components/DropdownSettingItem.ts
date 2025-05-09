import SelectField from '@/modules/setting/components/fields/SelectField.ts';
import LabelledSettingItem from '@/modules/setting/components/LabelledSettingItem.ts';
import SettingItem from '@/modules/setting/components/SettingItem.ts';
import { IconName } from '@/shared/ui/icons.ts';

class DropdownSettingItem extends LabelledSettingItem {
  constructor(
    label: string,
    caption: string,
    iconName: IconName,
    private initialState: string,
    private onChange: (newValue: string) => void
  ) {
    super(label, caption, iconName);
  }

  create(): SettingItem {
    const item = new SettingItem();

    const labelWrapper = this.createLabelContent();
    item.labelContainer.appendChild(labelWrapper);

    const select = new SelectField(
      this.onChange,
      this.initialState,
      [
        { label: 'English', value: 'en' },
        { label: 'فارسی', value: 'fa' },
      ],
    );
    item.addChild(select);
    select.mount(item.buttonContainer);

    return item;
  }
}

export default DropdownSettingItem;
