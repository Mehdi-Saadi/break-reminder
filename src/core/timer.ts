import { minutesToMilliseconds, secondsToMilliseconds } from '@/common/time.ts';
import settingState from '@/core/state/SettingState.ts';
import breakMessage from '@/core/breakMessage.ts';
import notify from '@/core/notification.ts';
import { Second } from '@/common/types';

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
      this.workTimeout = null;
    }
  }

  private takeBreak = async (): Promise<void> => {
    this.countOfShortWorks++;

    if (this.shouldTakeLongBreak()) {
      await this.takeLongBreak();
    } else {
      await this.takeShortBreak();
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

  private setBreakTimeout(seconds: Second): void {
    this.breakTimeout = setTimeout(this.setWorkTimeout, secondsToMilliseconds(seconds));
  }

  private clearBreakTimeout(): void {
    if (this.breakTimeout) {
      clearTimeout(this.breakTimeout);
      this.breakTimeout = null;
    }
  }

  private async takeLongBreak(): Promise<void> {
    await notify(breakMessage.getLongBreakMessage());

    this.setBreakTimeout(settingState.settings.longBreakDuration);
  }

  private async takeShortBreak(): Promise<void> {
    await notify(breakMessage.getShortBreakMessage());

    this.setBreakTimeout(settingState.settings.shortBreakDuration);
  }

  skip(): void {
    console.log('skip');
  }
}

const timer = new Timer();

export default timer;
