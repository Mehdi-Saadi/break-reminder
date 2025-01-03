import Component from '@/common/ui/base/component.ts'

class SquareButton extends Component {
  constructor() {
    super('button', 'flex items-center justify-center size-6 active:bg-[#eaeaea] hover:bg-[#ededed] active:dark:bg-[#2d2d2d] hover:dark:bg-[#292929]');

    this.element.setAttribute('type', 'button');
  }
}

export default SquareButton;
