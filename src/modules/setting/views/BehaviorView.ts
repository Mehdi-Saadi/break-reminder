import CheckboxField from '@/modules/setting/components/fields/CheckboxField.ts';
import Component from '@/shared/ui/base/Component.ts';
import NumberField from '@/modules/setting/components/fields/NumberField.ts';
import SettingItem from '@/modules/setting/components/SettingItem.ts';
import icon, { IconName } from '@/shared/ui/icons.ts';
import settingState from '@/shared/state/setting';
import { Second } from '@/shared/time';
import t from '@/modules/i18n';

class BehaviorView extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');

    this.createSettingItems();
  }

  private createSettingItems(): void {
    // todo: implement more setting options
    this.createCheckboxSettingItem(
      t('strictBreak'),
      t('strictBreakInfo'),
      'lock',
      settingState.value.strictBreak,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          strictBreak: newValue
        };
      },
    );
    this.createCheckboxSettingItem(
      t('doNotDisturb'),
      t('doNotDisturbInfo'),
      'doNotDisturbOn',
      settingState.value.doNotDisturb,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          doNotDisturb: newValue
        };
      }
    );
    this.createNumberSettingItem(
      t('timeToPrepareForBreakInSeconds'),
      '',
      'hourglassTop',
      settingState.value.timeToPrepareForBreak,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          timeToPrepareForBreak: newValue as Second
        };
      },
    );
    // this.createCheckboxItem(
    //   'Allow postponing breaks',
    //   (newValue) => { settingState.value = { allowPostponingBreaks: newValue }; },
    //   settingState.value.allowPostponingBreaks,
    // );
    // this.createNumberItem(
    //   'Postpone duration (in minutes)',
    //   (newValue) => { settingState.value = { postponeDuration: newValue as Minute }; },
    //   settingState.value.postponeDuration,
    // );
  }

  private createNumberSettingItem(
    label: string,
    caption: string,
    iconName: IconName,
    initialState: number,
    onChange: (newValue: number) => void,
    step: number = 5,
    max: number = 900,
  ): void {
    const item = new SettingItem();
    this.addChild(item);

    const labelWrapper = this.createLabelContent(label, caption, iconName);
    item.labelContainer.appendChild(labelWrapper);

    const numberField = new NumberField(onChange, step, max, initialState);
    this.addChild(numberField);

    numberField.mount(item.buttonContainer);
    item.mount(this);
  }

  private createCheckboxSettingItem(
    label: string,
    caption: string,
    iconName: IconName,
    initialState: boolean,
    onChange: (newValue: boolean) => void
  ): void {
    const item = new SettingItem();
    this.addChild(item);

    const labelWrapper = this.createLabelContent(label, caption, iconName);
    item.labelContainer.appendChild(labelWrapper);

    const checkbox = new CheckboxField(onChange, initialState);
    this.addChild(checkbox);

    checkbox.mount(item.buttonContainer);
    item.mount(this);
  }

  private createLabelContent(label: string, caption: string, iconName: IconName): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'flex items-center space-x-1');

    wrapper.innerHTML = icon(iconName, 'size-5');

    const textWrapper = document.createElement('div');
    textWrapper.setAttribute('class', 'flex flex-col');

    const labelElement = document.createElement('div');
    labelElement.setAttribute('class', 'font-semibold');
    labelElement.innerText = label;

    const captionElement = document.createElement('div');
    captionElement.setAttribute('class', 'text-xs text-[#5c5c5c] dark:text-[#cccccc]');
    captionElement.innerText = caption;

    textWrapper.appendChild(labelElement);
    textWrapper.appendChild(captionElement);

    wrapper.appendChild(textWrapper);
    return wrapper;
  }
}

export default BehaviorView;
