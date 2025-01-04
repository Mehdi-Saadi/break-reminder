import Component from '@/common/ui/base/Component.ts'

class SettingItem extends Component {
  buttonContainer: HTMLDivElement;

  constructor(label: string) {
    super('div', 'flex items-center');

    const textContainer = document.createElement('div');
    textContainer.setAttribute('class', 'grow pe-4 pb-0.5');
    textContainer.innerText = label;
    this.element.appendChild(textContainer);

    this.buttonContainer = document.createElement('div');
    this.element.appendChild(this.buttonContainer);
  }
}

export default SettingItem;
