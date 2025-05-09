import CheckboxField from '@/modules/setting/components/fields/CheckboxField.ts';
import Component from '@/shared/ui/base/Component.ts';
import SettingItem from '@/modules/setting/components/SettingItem.ts';
import settingState from '@/shared/state/setting';
import icon, { IconName } from '@/shared/ui/icons.ts';
import t from '@/modules/i18n';

class AdvancedView extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');

    this.createSettingItems();
  }

  private createSettingItems(): void {
    this.createSettingItem(
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
    this.createSettingItem(
      t('notification'),
      t('notificationInfo'),
      'notifications',
      settingState.value.notification,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          notification: newValue
        };
      }
    );
    this.createSettingItem(
      t('audibleAlert'),
      t('audibleAlertInfo'),
      'musicNote',
      settingState.value.audibleAlert,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          audibleAlert: newValue
        };
      }
    );
    // todo: implement more setting options
    // this.createSettingItem(
    //   'Smart Pause',
    //   'Pause reminder if system is idle',
    //   'networkIntelligence',
    //   settingState.value.smartPause,
    //   (newValue) => (settingState.value = { smartPause: newValue })
    // );
    // this.createSettingItem(
    //   'Screensaver',
    //   'Lock the screen after long breaks by starting screensaver',
    //   'lock',
    //   settingState.value.screensaver,
    //   (newValue) => (settingState.value = { screensaver: newValue })
    // );
    this.createSettingItem(
      t('darkMode'),
      '',
      'darkMode',
      settingState.value.darkMode,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          darkMode: newValue
        };
      }
    );
    this.createSettingItem(
      t('runOnStartup'),
      '',
      'presentToAll',
      settingState.value.autostart,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          autostart: newValue
        };
      }
    );
  }

  private createSettingItem(
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

export default AdvancedView;
