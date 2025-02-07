import { minutesToMilliseconds, secondsToMilliseconds, Second } from '@/shared/time.ts';
import fullscreenBreak from '@/features/break/fullscreen';
import settingState from '@/shared/state/setting';
import notify from '@/app/notification.ts';

class Timer {
  private workTimeout: NodeJS.Timeout | null = null;
  private prepareForBreakTimeout: NodeJS.Timeout | null = null;
  private breakTimeout: NodeJS.Timeout | null = null;
  private countOfShortWorks: number = 0;

  constructor() {
    this.startWork();
  }

  private startWork = (): void => {
    this.setWorkTimeout();
    this.setPrepareForBreakTimeoutIfNeeded();
  };

  private setWorkTimeout(): void {
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
    }
    return false;
  }

  private setPrepareForBreakTimeout(): void {
    const workTime = minutesToMilliseconds(settingState.settings.shortWorkDuration);
    const prepareTime = secondsToMilliseconds(settingState.settings.timeToPrepareForBreak);
    const prepareForBreakTime = workTime - prepareTime;

    this.prepareForBreakTimeout = setTimeout(this.notifyBeforeBreakIfNeeded, prepareForBreakTime);
  }

  private clearPrepareForBreakTimeout(): void {
    if (this.prepareForBreakTimeout) {
      clearTimeout(this.prepareForBreakTimeout);
      this.prepareForBreakTimeout = null;
    }
  }

  private notifyBeforeBreakIfNeeded = async (): Promise<void> => {
    if (settingState.settings.notification) {
      await notify(`Take a break in ${settingState.settings.timeToPrepareForBreak} seconds.`);
    }
  };

  private setPrepareForBreakTimeoutIfNeeded(): void {
    if (settingState.settings.notification) {
      this.setPrepareForBreakTimeout();
    }
  }

  private setBreakTimeout(seconds: Second): void {
    this.breakTimeout = setTimeout(this.startWork, secondsToMilliseconds(seconds));
  }

  private clearBreakTimeout(): void {
    if (this.breakTimeout) {
      clearTimeout(this.breakTimeout);
      this.breakTimeout = null;
    }
  }

  private async takeShortBreak(): Promise<void> {
    await fullscreenBreak.shortBreak();

    this.setBreakTimeout(settingState.settings.shortBreakDuration);
  }

  private async takeLongBreak(): Promise<void> {
    await fullscreenBreak.longBreak();

    this.setBreakTimeout(settingState.settings.longBreakDuration);
  }
}

const timer = new Timer();

export default timer;
