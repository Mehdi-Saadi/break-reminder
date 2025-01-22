import Component from '@/shared/ui/base/Component.ts';

class CheckboxField extends Component {
  constructor(
    private onChange?: (newValue: boolean) => void,
    initialValue: boolean = false,
  ) {
    super('input', 'size-4 cursor-pointer');

    this.element.setAttribute('type', 'checkbox');

    (this.element as HTMLInputElement).checked = initialValue;
  }

  private onClick = (): void => {
    this.onChange?.((this.element as HTMLInputElement).checked);
  };

  protected onMounted(): void {
    this.element.addEventListener('click', this.onClick);
  }

  protected onUnmounted(): void {
    this.element.removeEventListener('click', this.onClick);
  }
}

export default CheckboxField;
