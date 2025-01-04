import Component from '@/common/ui/base/Component.ts'

class SettingSection extends Component {
  protected settingContainer: HTMLDivElement;

  constructor(label: string) {
    super('div', 'relative pt-2');

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'border border-gray-300 rounded-md p-4 text-sm');

    // label
    const labelSpan = document.createElement('span');
    labelSpan.setAttribute('class', 'absolute top-0 start-2 text-xs font-semibold bg-[#f3f3f3] dark:bg-[#202020] px-1');
    labelSpan.innerText = label;
    wrapper.appendChild(labelSpan);

    // setting container
    this.settingContainer = document.createElement('div');
    this.settingContainer.setAttribute('class', 'flex flex-col space-y-3');
    wrapper.appendChild(this.settingContainer);

    this.element.appendChild(wrapper);
  }
}

export default SettingSection;
