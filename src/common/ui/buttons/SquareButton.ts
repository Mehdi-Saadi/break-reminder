import Component from '@/common/ui/base/Component.ts'

class SquareButton extends Component {
  constructor(protected onClick?: (event: MouseEvent) => void) {
    super('button', 'flex items-center justify-center size-6 active:bg-[#eaeaea] hover:bg-[#ededed] active:dark:bg-[#2d2d2d] hover:dark:bg-[#292929]');

    this.element.setAttribute('type', 'button');
  }

  protected onMounted() {
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
