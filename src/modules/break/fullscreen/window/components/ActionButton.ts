import Component from '@/shared/ui/base/Component.ts';

class ActionButton extends Component {
  constructor(label: string, protected onClick?: (event: MouseEvent) => void) {
    super('button', 'flex items-center justify-center border border-gray-300 rounded-3xl w-24 h-10 mx-2 hover:bg-gray-300 hover:bg-gray-300/10 active:bg-gray-300/20 cursor-pointer');

    this.element.setAttribute('type', 'button');

    const span = document.createElement('span');
    span.innerHTML = label;

    this.element.appendChild(span);
  }

  protected onMounted(): void {
    if (this.onClick) {
      this.element.addEventListener('click', this.onClick);
    }
  }

  protected onUnmounted(): void {
    if (this.onClick) {
      this.element.removeEventListener('click', this.onClick);
    }
  }
}

export default ActionButton;
