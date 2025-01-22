import SquareButton from '@/shared/ui/buttons/SquareButton.ts';
import icon from '@/shared/ui/icons.ts';

class SquareAddButton extends SquareButton {
  constructor(onClick?: (event: MouseEvent) => void) {
    super(onClick);

    this.element.innerHTML = icon('add', 'size-4');
  }
}

export default SquareAddButton;
