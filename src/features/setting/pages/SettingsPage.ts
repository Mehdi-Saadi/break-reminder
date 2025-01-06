import Component from '@/common/ui/base/Component.ts';
import settingState from '@/core/state/SettingState.ts';
import NumberField from '@/features/setting/components/NumberField.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import SettingSection from '@/features/setting/components/SettingSection.ts';

class SettingsPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-4');

    // short breaks
    const shortBreaksSection = new SettingSection('Short Breaks');

    const workDurationItem = new SettingItem('Work Duration (in minutes)');
    const workDurationInput = new NumberField(
      5,
      120,
      (newValue) => {
        settingState.settings = { shortWorkDuration: newValue };
      },
      settingState.settings.shortWorkDuration,
    );
    workDurationInput.mount(workDurationItem.buttonContainer);
    workDurationItem.mount(shortBreaksSection.settingContainer);

    const breakDurationItem = new SettingItem('Break Duration (in seconds)');
    breakDurationItem.buttonContainer.innerText = 'some button';
    breakDurationItem.mount(shortBreaksSection.settingContainer);

    shortBreaksSection.mount(this);
  }
}

export default SettingsPage;
