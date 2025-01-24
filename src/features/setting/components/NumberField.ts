import Component from '@/shared/ui/base/Component.ts';
import SquareAddButton from '@/features/setting/components/buttons/SquareAddButton.ts';
import SquareRemoveButton from '@/features/setting/components/buttons/SquareRemoveButton.ts';

class NumberField extends Component {
  protected disableLayer: HTMLDivElement;
  protected inputField: HTMLInputElement;

  constructor(
    public step: number,
    public max: number,
    private onChange?: (newValue: number) => void,
    initialValue: number = 0,
  ) {
    super('div', 'flex items-center border border-gray-300 rounded-md overflow-hidden relative');

    this.disableLayer = document.createElement('div');
    this.disableLayer.setAttribute('class', 'absolute size-full z-10');
    this.element.appendChild(this.disableLayer);

    this.inputField = document.createElement('input');
    this.inputField.setAttribute('type', 'text');
    this.inputField.setAttribute('class', 'h-6 w-9 focus:outline-0 px-1 bg-inherit border-e border-gray-300');
    this.inputField.value = String(initialValue);
    this.element.appendChild(this.inputField);

    const removeButton = new SquareRemoveButton(this.decrease);
    this.addChild(removeButton);
    removeButton.mount(this);

    const addButton = new SquareAddButton(this.increase);
    this.addChild(addButton);
    addButton.mount(this);

    this.enable();
  }

  enable(): void {
    this.disableLayer.style.display = 'none';
    this.element.classList.remove('opacity-50');
  }

  disable(): void {
    this.disableLayer.style.display = 'block';
    this.element.classList.add('opacity-50');
  }

  private increase = (): void => {
    const newValue = Number(this.inputField.value) + this.step;

    if (newValue <= this.max) {
      this.inputField.value = String(newValue);
      this.onChange?.(newValue);
    }
  };

  private decrease = (): void => {
    const newValue = Number(this.inputField.value) - this.step;

    this.inputField.value = String(newValue < 0 ? 0 : newValue);
    this.onChange?.(Number(this.inputField.value));
  };

  private onInput = (): void => {
    let newValue = this.inputField.value.replace(/\D/g, '');

    if (!newValue) {
      newValue = '0';
    } else if (Number(newValue) > this.max) {
      newValue = newValue.slice(0, -1);
    }

    this.inputField.value = String(Number(newValue));
    this.onChange?.(Number(this.inputField.value));
  };

  protected onMounted(): void {
    this.inputField.addEventListener('input', this.onInput);
  }

  protected onUnmounted(): void {
    this.inputField.removeEventListener('input', this.onInput);
  }
}

export default NumberField;
