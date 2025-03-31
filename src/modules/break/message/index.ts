import settingState from '@/shared/state/setting';

/**
 * Rotates over the break messages saved in settings
 */
class BreakMessage {
  private shortBreakMessageIndex: number = 0;
  private longBreakMessageIndex: number = 0;

  private getMessage(messages: string[], index: number): [string, number] {
    if (messages.length < (index + 1)) {
      index = 0;
    }

    const message = messages[index] || '';
    index++;

    return [message, index];
  }

  getShortBreakMessage(): string {
    const [message, newIndex] = this.getMessage(
      Object.values(settingState.value.shortBreakMessages),
      this.shortBreakMessageIndex,
    );

    this.shortBreakMessageIndex = newIndex;

    return message;
  }

  getLongBreakMessage(): string {
    const [message, newIndex] = this.getMessage(
      Object.values(settingState.value.longBreakMessages),
      this.longBreakMessageIndex,
    );

    this.longBreakMessageIndex = newIndex;

    return message;
  }
}

const breakMessage = new BreakMessage();

export default breakMessage;
