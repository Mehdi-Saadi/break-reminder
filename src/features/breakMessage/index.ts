import settingState from '@/shared/state/setting';

type BreakMessageIndex = 'shortBreakMessageIndex' | 'longBreakMessageIndex';

/**
 * Rotates over the break messages saved in settings
 */
class BreakMessage {
  private getMessage(messages: string[], index: number): [string, number] {
    if (messages.length < (index + 1)) {
      index = 0;
    }

    const message = messages[index] || '';
    index++;

    return [message, index];
  }

  private getIndexFromLocalStorage(key: BreakMessageIndex): number {
    const index = Number(localStorage.getItem(key));
    return !isNaN(index) && index >= 0 ? index : 0;
  }

  private setIndexToLocalStorage(key: BreakMessageIndex, value: number): void {
    localStorage.setItem(key, String(value));
  }

  getShortBreakMessage(): string {
    const [message, newIndex] = this.getMessage(
      Object.values(settingState.settings.shortBreakMessages),
      this.getIndexFromLocalStorage('shortBreakMessageIndex'),
    );

    this.setIndexToLocalStorage('shortBreakMessageIndex', newIndex);

    return message;
  }

  getLongBreakMessage(): string {
    const [message, newIndex] = this.getMessage(
      Object.values(settingState.settings.longBreakMessages),
      this.getIndexFromLocalStorage('longBreakMessageIndex'),
    );

    this.setIndexToLocalStorage('longBreakMessageIndex', newIndex);

    return message;
  }
}

const breakMessage = new BreakMessage();

export default breakMessage;
