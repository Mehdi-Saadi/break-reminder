import CheckboxField from '@/features/setting/components/CheckboxField.ts';
import Component from '@/common/ui/base/Component.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import settingState from '@/core/state/SettingState.ts';
import icon from '@/common/ui/icons.ts';

class SettingsPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');

    this.setupDoNotDisturb();
    this.setupNotification();
  }

  private setupDoNotDisturb(): void {
    const settingItem = new SettingItem();

    // label
    const labelWrapper = document.createElement('div');
    labelWrapper.setAttribute('class', 'flex items-center space-x-1');

    // icon
    labelWrapper.innerHTML = icon('doNotDisturbOn', 'size-5');

    // text
    const textWrapper = document.createElement('div');
    textWrapper.setAttribute('class', 'flex flex-col');

    const label = document.createElement('div');
    label.setAttribute('class', 'font-semibold');
    label.innerText = 'Do Not Disturb';

    const caption = document.createElement('div');
    caption.setAttribute('class', 'text-xs text-[#5c5c5c] dark:text-[#cccccc]');
    caption.innerText = 'Skip the break if the active window is in fullscreen mode';

    textWrapper.appendChild(label);
    textWrapper.appendChild(caption);

    labelWrapper.appendChild(textWrapper);
    settingItem.labelContainer.appendChild(labelWrapper);

    // checkbox
    const checkboxField = new CheckboxField(
      (newValue) => {
        settingState.settings = { doNotDisturb: newValue };
      },
      settingState.settings.doNotDisturb,
    );

    checkboxField.mount(settingItem.buttonContainer);

    settingItem.mount(this);
  }

  private setupNotification(): void {
    const settingItem = new SettingItem();

    // label
    const labelWrapper = document.createElement('div');
    labelWrapper.setAttribute('class', 'flex items-center space-x-1');

    // icon
    labelWrapper.innerHTML = icon('notifications', 'size-5');

    // text
    const textWrapper = document.createElement('div');
    textWrapper.setAttribute('class', 'flex flex-col');

    const label = document.createElement('div');
    label.setAttribute('class', 'font-semibold');
    label.innerText = 'Notification';

    const caption = document.createElement('div');
    caption.setAttribute('class', 'text-xs text-[#5c5c5c] dark:text-[#cccccc]');
    caption.innerText = 'Show a system notification before breaks';

    textWrapper.appendChild(label);
    textWrapper.appendChild(caption);

    labelWrapper.appendChild(textWrapper);
    settingItem.labelContainer.appendChild(labelWrapper);

    // checkbox
    const checkboxField = new CheckboxField(
      (newValue) => {
        settingState.settings = { notification: newValue };
      },
      settingState.settings.notification,
    );

    checkboxField.mount(settingItem.buttonContainer);

    settingItem.mount(this);
  }
}

export default SettingsPage;
