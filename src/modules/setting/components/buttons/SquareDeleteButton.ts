import SquareButton from '@/modules/setting/components/buttons/SquareButton.ts';
import icon from '@/shared/ui/icons.ts';

class SquareDeleteButton extends SquareButton {
  constructor(onClick?: (event: MouseEvent) => void) {
    super(onClick);

    this.element.classList.add('rounded-full', 'border', 'border-gray-300', 'text-red-500');
    this.element.innerHTML = icon('delete', 'size-4');
  }
}

export default SquareDeleteButton;
