import Component from '@/common/ui/base/Component.ts'

class SettingItem extends Component {
  labelContainer: HTMLDivElement;
  buttonContainer: HTMLDivElement;

  constructor(label?: string) {
    super('div', 'flex items-center');

    this.labelContainer = document.createElement('div');
    this.labelContainer.setAttribute('class', 'grow pe-4 pb-0.5');
    if (label) {
      this.labelContainer.innerText = label;
    }
    this.element.appendChild(this.labelContainer);

    this.buttonContainer = document.createElement('div');
    this.element.appendChild(this.buttonContainer);
  }
}

export default SettingItem;
