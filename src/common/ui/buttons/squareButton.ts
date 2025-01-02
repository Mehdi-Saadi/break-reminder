class SquareButton {
  element: HTMLButtonElement;

  constructor() {
    this.element = document.createElement('button');

    this.element.setAttribute('class', 'flex items-center justify-center size-6 active:bg-[#eaeaea] hover:bg-[#ededed] active:dark:bg-[#2d2d2d] hover:dark:bg-[#292929]');
    this.element.setAttribute('type', 'button');
  }
}

export default SquareButton;
