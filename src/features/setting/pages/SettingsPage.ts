import CheckboxField from '@/features/setting/components/CheckboxField.ts';
import Component from '@/shared/ui/base/Component.ts';
import NumberField from '@/features/setting/components/NumberField.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import SettingSection from '@/features/setting/components/SettingSection.ts';
import settingState from '@/app/state/SettingState.ts';

class SettingsPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    this.createSections();
  }

  private createSections(): void {
    this.createSection('Short Breaks', [
      this.createNumberItem(
        'Work Duration (in minutes)',
        (newValue) => { settingState.settings = { shortWorkDuration: newValue }; },
        settingState.settings.shortWorkDuration,
      ),
      this.createNumberItem(
        'Break Duration (in seconds)',
        (newValue) => { settingState.settings = { shortBreakDuration: newValue }; },
        settingState.settings.shortBreakDuration,
      ),
    ]);

    this.createSection('Long Breaks', [
      this.createNumberItem(
        'Count of short works for a long break',
        (newValue) => { settingState.settings = { countOfShortWorksForLongBreak: newValue }; },
        settingState.settings.countOfShortWorksForLongBreak,
        1,
      ),
      this.createNumberItem(
        'Break Duration (in seconds)',
        (newValue) => { settingState.settings = { longBreakDuration: newValue }; },
        settingState.settings.longBreakDuration,
      ),
    ]);

    this.createSection('Options', [
      this.createNumberItem(
        'Time to prepare for a break (in seconds)',
        (newValue) => { settingState.settings = { timeToPrepareForBreak: newValue }; },
        settingState.settings.timeToPrepareForBreak,
      ),
      this.createCheckboxItem(
        'Strict break (No way to skip breaks)',
        (newValue) => { settingState.settings = { strictBreak: newValue }; },
        settingState.settings.strictBreak,
      ),
      this.createCheckboxItem(
        'Allow postponing breaks',
        (newValue) => { settingState.settings = { allowPostponingBreaks: newValue }; },
        settingState.settings.allowPostponingBreaks,
      ),
      this.createNumberItem(
        'Postpone duration (in minutes)',
        (newValue) => { settingState.settings = { postponeDuration: newValue }; },
        settingState.settings.postponeDuration,
      ),
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
    max: number = 120,
  ): SettingItem {
    const settingItem = new SettingItem(label);

    const numberField = new NumberField(step, max, onChange, initialValue);
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

export default SettingsPage;
