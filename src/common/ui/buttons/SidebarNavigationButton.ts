import Component from '@/common/ui/base/Component.ts';

abstract class SidebarNavigationButton extends Component {
  protected constructor(htmlIcon: string, label: string) {
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

  protected onMounted(): void {
    this.element.addEventListener('click', this.clickHandler);
  }

  protected onUnmounted(): void {
    this.element.removeEventListener('click', this.clickHandler);
  }

  protected abstract clickHandler(): void
}

export default SidebarNavigationButton;
