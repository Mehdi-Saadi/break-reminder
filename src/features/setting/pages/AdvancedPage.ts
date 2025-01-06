import CheckboxField from '@/features/setting/components/CheckboxField.ts';
import Component from '@/common/ui/base/Component.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import settingState from '@/core/state/SettingState.ts';
import icon, { IconName } from '@/common/ui/icons.ts';

class AdvancedPage extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');
    this.setupSettingItem(
      'Do Not Disturb',
      'Skip the break if the active window is in fullscreen mode',
      'doNotDisturbOn',
      settingState.settings.doNotDisturb,
      (newValue) => (settingState.settings = { doNotDisturb: newValue })
    );
    this.setupSettingItem(
      'Notification',
      'Show a system notification before breaks',
      'notifications',
      settingState.settings.notification,
      (newValue) => (settingState.settings = { notification: newValue })
    );
    this.setupSettingItem(
      'Audible Alert',
      'Play an audible alert at the end of breaks',
      'musicNote',
      settingState.settings.audibleAlert,
      (newValue) => (settingState.settings = { audibleAlert: newValue })
    );
    this.setupSettingItem(
      'Smart Pause',
      'Pause reminder if system is idle',
      'networkIntelligence',
      settingState.settings.smartPause,
      (newValue) => (settingState.settings = { smartPause: newValue })
    );
    this.setupSettingItem(
      'Screensaver',
      'Lock the screen after long breaks by starting screensaver',
      'lock',
      settingState.settings.screensaver,
      (newValue) => (settingState.settings = { screensaver: newValue })
    );
    this.setupSettingItem(
      'Dark Mode',
      '',
      'darkMode',
      settingState.settings.darkMode,
      (newValue) => (settingState.settings = { darkMode: newValue })
    );
  }

  private setupSettingItem(
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

export default AdvancedPage;
