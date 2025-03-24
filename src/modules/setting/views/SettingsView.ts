import CheckboxField from '@/modules/setting/components/fields/CheckboxField.ts';
import Component from '@/shared/ui/base/Component.ts';
import NumberField from '@/modules/setting/components/fields/NumberField.ts';
import SettingItem from '@/modules/setting/components/SettingItem.ts';
import SettingSection from '@/modules/setting/components/SettingSection.ts';
import settingState from '@/shared/state/setting';
import { Minute, Second } from '@/shared/time';

class SettingsView extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    this.createSections();
  }

  private createSections(): void {
    this.createSection('Short Breaks', [
      this.createNumberItem(
        'Work Duration (in minutes)',
        (newValue) => {
          settingState.value = {
            ...settingState.value,
            shortWorkDuration: newValue as Minute
          };
        },
        settingState.value.shortWorkDuration,
      ),
      this.createNumberItem(
        'Break Duration (in seconds)',
        (newValue) => {
          settingState.value = {
            ...settingState.value,
            shortBreakDuration: newValue as Second
          };
        },
        settingState.value.shortBreakDuration,
      ),
    ]);

    this.createSection('Long Breaks', [
      this.createNumberItem(
        'Count of short works for a long break',
        (newValue) => {
          settingState.value = {
            ...settingState.value,
            countOfShortWorksForLongBreak: newValue
          };
        },
        settingState.value.countOfShortWorksForLongBreak,
        1,
      ),
      this.createNumberItem(
        'Break Duration (in seconds)',
        (newValue) => {
          settingState.value = {
            ...settingState.value,
            longBreakDuration: newValue as Second
          };
        },
        settingState.value.longBreakDuration,
      ),
    ]);

    // todo: implement more setting options
    this.createSection('Options', [
      this.createNumberItem(
        'Time to prepare for a break (in seconds)',
        (newValue) => {
          settingState.value = {
            ...settingState.value,
            timeToPrepareForBreak: newValue as Second
          };
        },
        settingState.value.timeToPrepareForBreak,
      ),
      this.createCheckboxItem(
        'Strict break (No way to skip breaks)',
        (newValue) => {
          settingState.value = {
            ...settingState.value,
            strictBreak: newValue
          };
        },
        settingState.value.strictBreak,
      ),
      // this.createCheckboxItem(
      //   'Allow postponing breaks',
      //   (newValue) => { settingState.value = { allowPostponingBreaks: newValue }; },
      //   settingState.value.allowPostponingBreaks,
      // ),
      // this.createNumberItem(
      //   'Postpone duration (in minutes)',
      //   (newValue) => { settingState.value = { postponeDuration: newValue as Minute }; },
      //   settingState.value.postponeDuration,
      // ),
    ]);
  }

  private createSection(label: string, settingItems: SettingItem[]): void {
    const section = new SettingSection(label);

    for (const settingItem of settingItems) {
      section.addChild(settingItem);
      settingItem.mount(section.settingContainer);
    }

    this.addChild(section);
    section.mount(this);
  }

  private createNumberItem(
    label: string,
    onChange: (newValue: number) => void,
    initialValue: number,
    step: number = 5,
    max: number = 900,
  ): SettingItem {
    const settingItem = new SettingItem(label);

    const numberField = new NumberField(onChange, step, max, initialValue);
    settingItem.addChild(numberField);
    numberField.mount(settingItem.buttonContainer);

    return settingItem;
  }

  private createCheckboxItem(
    label: string,
    onChange: (newValue: boolean) => void,
    initialValue: boolean,
  ): SettingItem {
    const settingItem = new SettingItem(label);

    const checkboxField = new CheckboxField(onChange, initialValue);
    settingItem.addChild(checkboxField);
    checkboxField.mount(settingItem.buttonContainer);

    return settingItem;
  }
}

export default SettingsView;
