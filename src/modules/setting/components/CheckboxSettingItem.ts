import CheckboxField from '@/modules/setting/components/fields/CheckboxField.ts';
import SettingItem from '@/modules/setting/components/SettingItem.ts';
import icon, { IconName } from '@/shared/ui/icons.ts';

class CheckboxSettingItem {
  constructor(
    private label: string,
    private caption: string,
    private iconName: IconName,
    private initialState: boolean,
    private onChange: (newValue: boolean) => void
  ) {}

  create(): SettingItem {
    const item = new SettingItem();

    const labelWrapper = this.createLabelContent();
    item.labelContainer.appendChild(labelWrapper);

    const checkbox = new CheckboxField(this.onChange, this.initialState);
    item.addChild(checkbox);

    checkbox.mount(item.buttonContainer);

    return item;
  }

  private createLabelContent(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'flex items-center space-x-1');

    wrapper.innerHTML = icon(this.iconName, 'size-5');

    const textWrapper = document.createElement('div');
    textWrapper.setAttribute('class', 'flex flex-col');

    const labelElement = document.createElement('div');
    labelElement.setAttribute('class', 'font-semibold');
    labelElement.innerText = this.label;

    const captionElement = document.createElement('div');
    captionElement.setAttribute('class', 'text-xs text-[#5c5c5c] dark:text-[#cccccc]');
    captionElement.innerText = this.caption;

    textWrapper.appendChild(labelElement);
    textWrapper.appendChild(captionElement);

    wrapper.appendChild(textWrapper);
    return wrapper;
  }
}

export default CheckboxSettingItem;
