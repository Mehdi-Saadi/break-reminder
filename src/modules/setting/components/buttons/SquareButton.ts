import Component from '@/shared/ui/base/Component.ts';

class SquareButton extends Component {
  constructor(protected onClick?: (event: MouseEvent) => void) {
    super('button', 'flex items-center justify-center size-6 active:bg-[#eaeaea] hover:bg-[#ededed] dark:active:bg-[#2d2d2d] dark:hover:bg-[#292929]');

    this.element.setAttribute('type', 'button');
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

export default SquareButton;
