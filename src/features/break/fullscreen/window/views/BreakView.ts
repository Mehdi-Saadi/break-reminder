import ActionButton from '@/features/break/fullscreen/window/components/ActionButton';
import Component from '@/shared/ui/base/Component.ts';

class BreakView extends Component {
  constructor() {
    super('div', 'w-screen h-screen flex items-center justify-center bg-black bg-opacity-80 text-gray-300 select-none');

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'flex flex-col items-center space-y-5');

    // message
    const messageContainer = document.createElement('div');
    messageContainer.setAttribute('class', 'font-semibold text-4xl');
    messageContainer.innerHTML = 'Hello World!';
    wrapper.appendChild(messageContainer);

    // todo timer
    const timerWrapper = document.createElement('div');
    timerWrapper.setAttribute('class', 'text-sm opacity-0');
    timerWrapper.innerHTML = '00:12';
    wrapper.appendChild(timerWrapper);

    // todo actions
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
    wrapper.appendChild(actionWrapper);

    this.element.appendChild(wrapper);
  }
}

export default BreakView;
