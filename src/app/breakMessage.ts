import settingState from '@/app/state/SettingState.ts';

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
      Object.values(settingState.settings.shortBreakMessages),
      this.shortBreakMessageIndex,
    );

    this.shortBreakMessageIndex = newIndex;

    return message;
  }

  getLongBreakMessage(): string {
    const [message, newIndex] = this.getMessage(
      Object.values(settingState.settings.longBreakMessages),
      this.longBreakMessageIndex,
    );

    this.longBreakMessageIndex = newIndex;

    return message;
  }
}

const breakMessage = new BreakMessage();

export default breakMessage;
