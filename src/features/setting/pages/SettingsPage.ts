import Component from '@/common/ui/base/Component.ts';
import settingState from '@/core/state/SettingState.ts';
import NumberField from '@/features/setting/components/NumberField.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import SettingSection from '@/features/setting/components/SettingSection.ts';

class SettingsPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    this.setupShortBreaks();
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
}

export default SettingsPage;
