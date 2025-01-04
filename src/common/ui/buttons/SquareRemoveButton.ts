import SquareButton from '@/common/ui/buttons/SquareButton.ts';
import icon from '@/common/ui/icons.ts';

class SquareRemoveButton extends SquareButton {
  constructor() {
    super();

    this.element.innerHTML = icon('remove', 'size-4');
  }
}

export default SquareRemoveButton;
