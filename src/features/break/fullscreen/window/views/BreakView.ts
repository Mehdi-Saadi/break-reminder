import ActionButton from '@/features/break/fullscreen/window/components/ActionButton';
import Component from '@/shared/ui/base/Component.ts';

class BreakView extends Component {
  private wrapper: HTMLDivElement;

  constructor() {
    super('div', 'w-screen h-screen flex items-center justify-center bg-black bg-opacity-80 text-gray-300 select-none');

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', 'flex flex-col items-center space-y-5');

    this.createMessageSection();
    // this.createTimerSection();
    // this.createActionButtons();

    this.element.appendChild(this.wrapper);
  }

  private createMessageSection(): void {
    const messageContainer = document.createElement('div');
    messageContainer.setAttribute('class', 'font-semibold text-4xl');
    messageContainer.innerHTML = 'Hello World!';
    this.wrapper.appendChild(messageContainer);
  }

  // TODO: implement a count down timer
  private createTimerSection(): void {
    const timerWrapper = document.createElement('div');
    timerWrapper.setAttribute('class', 'text-sm opacity-0');
    timerWrapper.innerHTML = '00:12';
    this.wrapper.appendChild(timerWrapper);
  }

  // TODO: implement action buttons for skipping and postponing break
  private createActionButtons(): void {
    const actionWrapper = document.createElement('div');
    actionWrapper.setAttribute('class', 'flex items-center text-xs opacity-0');
    // postpone
    const postponeButton = new ActionButton('Postpone');
    postponeButton.mount(actionWrapper);
    this.addChild(postponeButton);
    // skip
    const skipButton = new ActionButton('Skip');
    skipButton.mount(actionWrapper);
    this.addChild(skipButton);
    this.wrapper.appendChild(actionWrapper);
  }
}

export default BreakView;
