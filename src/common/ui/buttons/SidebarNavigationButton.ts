import Component from '@/common/ui/base/Component.ts';

class SidebarNavigationButton extends Component {
  constructor(htmlIcon: string, label: string) {
    super('button', 'flex items-center pe-4 py-2 rounded-md text-sm');

    this.element.setAttribute('type', 'button');

    // button icon
    this.element.innerHTML = htmlIcon;

    // button label
    const span = document.createElement('span');
    span.setAttribute('class', 'pb-0.5');
    span.innerText = label

    this.element.appendChild(span);
  }
}

export default SidebarNavigationButton;
