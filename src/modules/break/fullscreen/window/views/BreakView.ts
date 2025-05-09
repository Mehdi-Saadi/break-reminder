import ActionButton from '@/modules/break/fullscreen/window/components/ActionButton';
import Component from '@/shared/ui/base/Component.ts';
import { BREAK_WINDOW_EVENT, IBreakWindowPayload } from '@/modules/break/fullscreen/communication';
import { emit, listen } from '@tauri-apps/api/event';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Millisecond, millisecondsToSeconds, secondsToMinutes } from '@/shared/time';

class BreakView extends Component {
  private wrapper: HTMLDivElement;
  private windowPayload: IBreakWindowPayload;

  constructor() {
    super('div', 'w-screen h-screen flex items-center justify-center bg-black/80 text-gray-300 select-none');
    this.initActionListeners();

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', 'flex flex-col items-center space-y-5');

    this.windowPayload = this.getBreakWindowPayloadFromUrl();

    this.createMessageSection();
    this.createTimerSection();
    this.createActionButtons();

    this.element.appendChild(this.wrapper);

    this.initDestroyWindowTimeout();
  }

  private getBreakWindowPayloadFromUrl(): IBreakWindowPayload {
    const searchParams = new URLSearchParams(window.location.search);

    return {
      message: searchParams.get('message') || undefined,
      timeout: parseInt(searchParams.get('timeout') || '20000') as Millisecond,
      showSkipBtn: searchParams.get('showSkipBtn') !== 'false',
      showPostponeBtn: searchParams.get('showPostponeBtn') !== 'false'
    };
  }

  private createMessageSection(): void {
    const messageContainer = document.createElement('div');
    messageContainer.setAttribute('class', 'font-semibold text-4xl');
    messageContainer.innerHTML = this.windowPayload.message || '';
    this.wrapper.appendChild(messageContainer);
  }

  private createTimerSection(): void {
    const timerWrapper = document.createElement('div');
    timerWrapper.setAttribute('class', 'text-sm');

    this.timer(formattedTime => { timerWrapper.innerHTML = formattedTime; });

    this.wrapper.appendChild(timerWrapper);
  }

  private timer(onUpdate: (formattedTime: string) => void): void {
    const interval = 1000 as Millisecond;
    let remainingTime = this.windowPayload.timeout;

    const formatTime = (ms: Millisecond): string => {
      const totalSeconds = millisecondsToSeconds(ms);
      const minutes = secondsToMinutes(totalSeconds);
      const seconds = totalSeconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    onUpdate(formatTime(remainingTime));

    setInterval(() => {
      remainingTime = (remainingTime - interval) as Millisecond;
      if (remainingTime > 0) {
        onUpdate(formatTime(remainingTime));
      }
    }, interval);
  }

  private createActionButtons(): void {
    const actionWrapper = document.createElement('div');
    actionWrapper.setAttribute('class', 'flex items-center text-xs');

    // Todo: implement postpone functionality
    // postpone
    if (this.windowPayload.showPostponeBtn) {
      const postponeButton = new ActionButton('Postpone');
      postponeButton.mount(actionWrapper);
      this.addChild(postponeButton);
    }

    // skip
    if (this.windowPayload.showSkipBtn) {
      const skipButton = new ActionButton('Skip', this.onSkip);
      skipButton.mount(actionWrapper);
      this.addChild(skipButton);
    }

    this.wrapper.appendChild(actionWrapper);
  }

  private onSkip = async (): Promise<void> => {
    await emit(BREAK_WINDOW_EVENT.skip);
  };

  private destroyCurrentWindow = (): Promise<void> => getCurrentWindow().destroy();

  private initActionListeners(): void {
    listen(BREAK_WINDOW_EVENT.skip, this.destroyCurrentWindow);
  }

  private initDestroyWindowTimeout(): void {
    setTimeout(this.destroyCurrentWindow, this.windowPayload.timeout);
  }
}

export default BreakView;
