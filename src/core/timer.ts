import { minutesToMilliseconds, secondsToMilliseconds } from '@/common/time.ts';
import settingState from '@/core/state/SettingState.ts';
import breakMessage from '@/core/breakMessage.ts';
import { Millisecond } from '@/common/types';
import notify from '@/core/notification.ts';

class Timer {
  private workTimeout: NodeJS.Timeout | null = null;
  private breakTimeout: NodeJS.Timeout | null = null;
  private countOfShortWorks: number = 0;

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
    notify(breakMessage.getLongBreakMessage());

    this.setBreakTimeout(secondsToMilliseconds(settingState.settings.longBreakDuration));
  }

  private takeShortBreak(): void {
    notify(breakMessage.getShortBreakMessage());

    this.setBreakTimeout(secondsToMilliseconds(settingState.settings.shortBreakDuration));
  }

  skip(): void {
    console.log('skip');
  }
}

const timer = new Timer();

export default timer;
