import Component from '@/common/ui/base/Component.ts';
import settingState from '@/core/state/SettingState.ts';
import NumberField from '@/features/setting/components/NumberField.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import SettingSection from '@/features/setting/components/SettingSection.ts';

class SettingsPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    this.setupShortBreaks();
    this.setupLongBreaks();
    this.setupOptions();
  }

  private setupShortBreaks(): void {
    const shortBreaksSection = new SettingSection('Short Breaks');

    // short work duration
    const shortWorkDurationItem = new SettingItem('Work Duration (in minutes)');
    const shortWorkDurationInput = new NumberField(
      5,
      120,
      (newValue) => {
        settingState.settings = { shortWorkDuration: newValue };
      },
      settingState.settings.shortWorkDuration,
    );
    shortWorkDurationInput.mount(shortWorkDurationItem.buttonContainer);
    shortWorkDurationItem.mount(shortBreaksSection.settingContainer);

    // short break duration
    const shortBreakDurationItem = new SettingItem('Break Duration (in seconds)');
    const shortBreakDurationInput = new NumberField(
      5,
      120,
      (newValue) => {
        settingState.settings = { shortBreakDuration: newValue };
      },
      settingState.settings.shortBreakDuration,
    );
    shortBreakDurationInput.mount(shortBreakDurationItem.buttonContainer);
    shortBreakDurationItem.mount(shortBreaksSection.settingContainer);

    shortBreaksSection.mount(this);
  }

  private setupLongBreaks(): void {
    const longBreaksSection = new SettingSection('Long Breaks');

    // long work duration
    const countOfShortWorksForLongBreakItem = new SettingItem('Count of short works for a long break');
    const countOfShortWorksForLongBreakInput = new NumberField(
      1,
      120,
      (newValue) => {
        settingState.settings = { countOfShortWorksForLongBreak: newValue };
      },
      settingState.settings.countOfShortWorksForLongBreak,
    );
    countOfShortWorksForLongBreakInput.mount(countOfShortWorksForLongBreakItem.buttonContainer);
    countOfShortWorksForLongBreakItem.mount(longBreaksSection.settingContainer);

    // long break duration
    const longBreakDurationItem = new SettingItem('Break Duration (in seconds)');
    const longBreakDurationInput = new NumberField(
      5,
      120,
      (newValue) => {
        settingState.settings = { longBreakDuration: newValue };
      },
      settingState.settings.longBreakDuration,
    );
    longBreakDurationInput.mount(longBreakDurationItem.buttonContainer);
    longBreakDurationItem.mount(longBreaksSection.settingContainer);

    longBreaksSection.mount(this);
  }

  private setupOptions(): void {
    const optionsSection = new SettingSection('Options');

    // time to prepare for a break
    const timeToPrepareForBreakItem = new SettingItem('Time to prepare for a break (in seconds)');
    const timeToPrepareForBreakInput = new NumberField(
      5,
      120,
      (newValue) => {
        settingState.settings = { timeToPrepareForBreak: newValue };
      },
      settingState.settings.timeToPrepareForBreak,
    );
    timeToPrepareForBreakInput.mount(timeToPrepareForBreakItem.buttonContainer);
    timeToPrepareForBreakItem.mount(optionsSection.settingContainer);

    // strict break
    const strictBreakItem  = new SettingItem('Strict break (No way to skip breaks)');
    strictBreakItem.buttonContainer.innerText = 'checkbox';
    strictBreakItem.mount(optionsSection.settingContainer);

    // allow postponing
    const allowPostponingBreakItem = new SettingItem('Allow postponing breaks');
    allowPostponingBreakItem.buttonContainer.innerText = 'checkbox';
    allowPostponingBreakItem.mount(optionsSection.settingContainer);

    // postpone duration
    const postponeDurationItem = new SettingItem('Postpone duration (in minutes)');
    const postponeDurationInput = new NumberField(
      5,
      120,
      (newValue) => {
        settingState.settings = { postponeDuration: newValue };
      },
      settingState.settings.postponeDuration,
    );
    postponeDurationInput.mount(postponeDurationItem.buttonContainer);
    postponeDurationItem.mount(optionsSection.settingContainer);

    if (!settingState.settings.allowPostponingBreaks) {
      postponeDurationInput.disable();
    }

    optionsSection.mount(this);
  }
}

export default SettingsPage;
