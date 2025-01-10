import { minutesToMilliseconds, secondsToMilliseconds } from '@/common/time.ts';
import settingState from '@/core/state/SettingState.ts';
import { Millisecond } from '@/common/types';
import notify from '@/core/notification.ts';

class Timer {
  private workTimeout: NodeJS.Timeout | null = null;
  private breakTimeout: NodeJS.Timeout | null = null;
  private countOfShortWorks: number = 0;
  private shortBreakMessageIndex: number = 0;
  private longBreakMessageIndex: number = 0;

  constructor() {
    this.setWorkTimeout();
  }

  private setWorkTimeout = (): void => {
    this.workTimeout = setTimeout(this.takeBreak, minutesToMilliseconds(settingState.settings.shortWorkDuration));
  };

  private clearWorkTimeout(): void {
    if (this.workTimeout) {
      clearTimeout(this.workTimeout);
    }
  }

  private takeBreak = (): void => {
    this.countOfShortWorks++;

    if (this.shouldTakeLongBreak()) {
      this.takeLongBreak();
    } else {
      this.takeShortBreak();
    }
  };

  private shouldTakeLongBreak(): boolean {
    if (this.countOfShortWorks >= settingState.settings.countOfShortWorksForLongBreak) {
      this.countOfShortWorks = 0;
      return true;
    } else {
      return false;
    }
  }

  private setBreakTimeout(ms: Millisecond): void {
    this.breakTimeout = setTimeout(this.setWorkTimeout, ms);
  }

  private clearBreakTimeout(): void {
    if (this.breakTimeout) {
      clearTimeout(this.breakTimeout);
    }
  }

  private takeLongBreak(): void {
    notify(this.getLongBreakMessage());

    this.setBreakTimeout(secondsToMilliseconds(settingState.settings.longBreakDuration));
  }

  private takeShortBreak(): void {
    notify(this.getShortBreakMessage());

    this.setBreakTimeout(secondsToMilliseconds(settingState.settings.shortBreakDuration));
  }

  private getMessage(messages: string[], index: number): [string, number] {
    if (messages.length < (index + 1)) {
      index = 0;
    }

    const message = messages[index] || '';
    index++;

    return [message, index];
  }

  private getShortBreakMessage(): string {
    const [message, newIndex] = this.getMessage(
      Object.values(settingState.settings.shortBreakMessages),
      this.shortBreakMessageIndex,
    );

    this.shortBreakMessageIndex = newIndex;

    return message;
  }

  private getLongBreakMessage(): string {
    const [message, newIndex] = this.getMessage(
      Object.values(settingState.settings.longBreakMessages),
      this.longBreakMessageIndex,
    );

    this.longBreakMessageIndex = newIndex;

    return message;
  }

  skip(): void {
    console.log('skip');
  }
}

const timer = new Timer();

export default timer;
