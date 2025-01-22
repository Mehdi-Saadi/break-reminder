import Component from '@/shared/ui/base/Component.ts';

class MessageInput extends Component {
  constructor(
    private onBlur?: (newValue: string) => void,
    initialValue: string = '',
  ) {
    super('input', 'bg-inherit w-full px-1 outline-gray-300');
    this.element.setAttribute('type', 'text');

    (this.element as HTMLInputElement).value = initialValue;
  }

  private blurHandler = (): void => {
    this.onBlur?.((this.element as HTMLInputElement).value);
  };

  protected onMounted(): void {
    this.element.addEventListener('blur', this.blurHandler);
  }

  protected onUnmounted(): void {
    this.element.removeEventListener('blur', this.blurHandler);
  }
}

export default MessageInput;
