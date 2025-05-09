import CheckboxSettingItem from '@/modules/setting/components/CheckboxSettingItem.ts';
import DropdownSettingItem from '@/modules/setting/components/DropdownSettingItem.ts';
import Component from '@/shared/ui/base/Component.ts';
import settingState from '@/shared/state/setting';
import t from '@/modules/i18n';
import { IconName } from '@/shared/ui/icons.ts';

class GeneralView extends Component {
  constructor() {
    super('div', 'flex flex-col space-y-5 p-4 text-sm');

    this.createSettingItems();
  }

  private createSettingItems(): void {
    this.createDropdownSettingItem(
      t('language'),
      'translate',
      settingState.value.language,
      (newValue) => {
        if (newValue === 'en' || newValue === 'fa') {
          settingState.value = {
            ...settingState.value,
            language: newValue,
          };
        }
      }
    );

    this.createCheckboxSettingItem(
      t('darkMode'),
      'darkMode',
      settingState.value.darkMode,
      (newValue) => {
        settingState.value = {
          ...settingState.value,
          darkMode: newValue
        };
      }
    );

    this.createCheckboxSettingItem(
      t('runOnStartup'),
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

  private createDropdownSettingItem(
    label: string,
    iconName: IconName,
    initialState: 'en' | 'fa',
    onChange: (newValue: string) => void
  ): void {
    const settingItem = new DropdownSettingItem(
      label,
      '',
      iconName,
      initialState,
      onChange,
    ).create();

    this.addChild(settingItem);
    settingItem.mount(this);
  }

  private createCheckboxSettingItem(
    label: string,
    iconName: IconName,
    initialState: boolean,
    onChange: (newValue: boolean) => void
  ): void {
    const settingItem = new CheckboxSettingItem(
      label,
      '',
      iconName,
      initialState,
      onChange
    ).create();

    this.addChild(settingItem);
    settingItem.mount(this);
  }
}

export default GeneralView;
