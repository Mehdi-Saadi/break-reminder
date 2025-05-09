import Component from '@/shared/ui/base/Component.ts';

class CheckboxField extends Component {
  constructor(
    private onChange?: (newValue: string) => void,
    initialValue: string = '',
    items: { label: string, value: string }[] = [],
  ) {
    super('select');

    const options: HTMLOptionElement[] = [];

    for (const item of items) {
      const option = document.createElement('option');
      option.text = item.label;
      option.value = item.value;
      options.push(option);
    }

    this.element.append(...options);

    (this.element as HTMLInputElement).value = initialValue;
  }

  private onClick = (): void => {
    this.onChange?.((this.element as HTMLInputElement).value);
  };

  protected onMounted(): void {
    this.element.addEventListener('change', this.onClick);
  }

  protected onUnmounted(): void {
    this.element.removeEventListener('change', this.onClick);
  }
}

export default CheckboxField;
