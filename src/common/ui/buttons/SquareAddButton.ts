import SquareButton from '@/common/ui/buttons/SquareButton.ts';
import icon from '@/common/ui/icons.ts';

class SquareAddButton extends SquareButton {
  constructor() {
    super();

    this.element.innerHTML = icon('add', 'size-4');
  }
}

export default SquareAddButton;
