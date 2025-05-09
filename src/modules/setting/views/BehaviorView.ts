import CheckboxField from '@/modules/setting/components/fields/CheckboxField.ts';
import Component from '@/shared/ui/base/Component.ts';
import NumberField from '@/modules/setting/components/fields/NumberField.ts';
import SettingItem from '@/modules/setting/components/SettingItem.ts';
import settingState from '@/shared/state/setting';
import t from '@/modules/i18n';
import { Second } from '@/shared/time';

class BehaviorView extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');

    this.createSettingItems();
  }

  private createSettingItems(): void {
    // todo: implement more setting options
    this.createNumberItem(
      t('timeToPrepareForBreakInSeconds'),
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          timeToPrepareForBreak: newValue as Second
        };
      },
      settingState.value.timeToPrepareForBreak,
    );
    this.createCheckboxItem(
      t('strictBreakNoWayToSkip'),
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          strictBreak: newValue
        };
      },
      settingState.value.strictBreak,
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

  private createNumberItem(
    label: string,
    onChange: (newValue: number) => void,
    initialValue: number,
    step: number = 5,
    max: number = 900,
  ): void {
    const settingItem = new SettingItem(label);

    const numberField = new NumberField(onChange, step, max, initialValue);
    settingItem.addChild(numberField);
    numberField.mount(settingItem.buttonContainer);

    this.addChild(settingItem);
    settingItem.mount(this);
  }

  private createCheckboxItem(
    label: string,
    onChange: (newValue: boolean) => void,
    initialValue: boolean,
  ): void {
    const settingItem = new SettingItem(label);

    const checkboxField = new CheckboxField(onChange, initialValue);
    settingItem.addChild(checkboxField);
    checkboxField.mount(settingItem.buttonContainer);

    this.addChild(settingItem);
    settingItem.mount(this);
  }
}

export default BehaviorView;
