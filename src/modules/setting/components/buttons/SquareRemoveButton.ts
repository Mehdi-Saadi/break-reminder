import SquareButton from '@/modules/setting/components/buttons/SquareButton.ts';
import icon from '@/shared/ui/icons.ts';

class SquareRemoveButton extends SquareButton {
  constructor(onClick?: (event: MouseEvent) => void) {
    super(onClick);

    this.element.innerHTML = icon('remove', 'size-4');
  }
}

export default SquareRemoveButton;
