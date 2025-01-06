import CheckboxField from '@/features/setting/components/CheckboxField.ts';
import Component from '@/common/ui/base/Component.ts';
import SettingItem from '@/features/setting/components/SettingItem.ts';
import settingState from '@/core/state/SettingState.ts';
import icon, { IconName } from '@/common/ui/icons.ts';

class AdvancedPage extends Component {
  private settings: Record<string, {
    item: SettingItem | null;
    checkbox: CheckboxField | null;
  }> = {
    doNotDisturb: { item: null, checkbox: null },
    notification: { item: null, checkbox: null },
  };

  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');
    this.setupSettingItem(
      'doNotDisturb',
      'Do Not Disturb',
      'Skip the break if the active window is in fullscreen mode',
      'doNotDisturbOn',
      settingState.settings.doNotDisturb,
      (newValue) => (settingState.settings = { doNotDisturb: newValue })
    );
    this.setupSettingItem(
      'notification',
      'Notification',
      'Show a system notification before breaks',
      'notifications',
      settingState.settings.notification,
      (newValue) => (settingState.settings = { notification: newValue })
    );
  }

  private setupSettingItem(
    key: string,
    label: string,
    caption: string,
    iconName: IconName,
    initialState: boolean,
    onChange: (newValue: boolean) => void
  ): void {
    const item = new SettingItem();

    // create and append label content
    const labelWrapper = this.createLabelContent(label, caption, iconName);
    item.labelContainer.appendChild(labelWrapper);

    // Create and append checkbox
    const checkbox = new CheckboxField(onChange, initialState);
    checkbox.mount(item.buttonContainer);

    // Mount setting item to the page
    item.mount(this);

    // Store references for cleanup
    this.settings[key] = { item, checkbox };
  }

  private createLabelContent(label: string, caption: string, iconName: IconName): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'flex items-center space-x-1');

    // icon
    wrapper.innerHTML = icon(iconName, 'size-5');

    // text
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

  protected onUnmounted(): void {
    Object.values(this.settings).forEach(({ item, checkbox }) => {
      checkbox?.unmount();
      item?.unmount();
    });
  }
}

export default AdvancedPage;
