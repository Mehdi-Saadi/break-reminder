import Component from '@/common/ui/base/Component.ts'

class SettingItem extends Component {
  protected textContainer: HTMLDivElement;
  protected buttonContainer: HTMLDivElement;

  constructor() {
    super('div', 'flex items-center');

    this.textContainer = document.createElement('div');
    this.textContainer.setAttribute('class', 'grow pe-4 pb-0.5');
    this.element.appendChild(this.textContainer);

    this.buttonContainer = document.createElement('div');
    this.element.appendChild(this.buttonContainer);
  }
}

export default SettingItem;
