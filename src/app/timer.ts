import breakAudio from '@/features/break/audio';
import fullscreenBreak from '@/features/break/fullscreen';
import notify from '@/app/notification.ts';
import settingState from '@/shared/state/setting';
import { BREAK_WINDOW_EVENT } from '@/features/break/fullscreen/communication';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { minutesToMilliseconds, Second, secondsToMilliseconds } from '@/shared/time.ts';

class Timer {
  private workTimeout: NodeJS.Timeout | null = null;
  private prepareForBreakTimeout: NodeJS.Timeout | null = null;
  private breakTimeout: NodeJS.Timeout | null = null;
  private countOfShortWorks: number = 0;

  constructor() {
    this.startWork();
    this.initBreakWindowListeners();
  }

  private startWork = (): void => {
    this.resetWorkTimeout();
    this.resetPrepareForBreakTimeout();
    breakAudio.playStopBreakAudio();
  };

  private setWorkTimeout(): void {
    this.workTimeout = setTimeout(this.takeBreak, minutesToMilliseconds(settingState.settings.shortWorkDuration));
  }

  private clearWorkTimeout(): void {
    if (this.workTimeout) {
      clearTimeout(this.workTimeout);
      this.workTimeout = null;
    }
  }

  private resetWorkTimeout(): void {
    this.clearWorkTimeout();
    this.setWorkTimeout();
  }

  private takeBreak = async (): Promise<void> => {
    this.countOfShortWorks++;

    if (this.shouldTakeLongBreak()) {
      await this.takeLongBreak();
    } else {
      await this.takeShortBreak();
    }

    await breakAudio.playPreBreakAudio();
  };

  private shouldTakeLongBreak(): boolean {
    if (this.countOfShortWorks >= settingState.settings.countOfShortWorksForLongBreak) {
      this.countOfShortWorks = 0;
      return true;
    }
    return false;
  }

  private async takeLongBreak(): Promise<void> {
    if (!await invoke('check_focused_window_maximized')) {
      await fullscreenBreak.longBreak();
    }

    this.resetBreakTimeout(settingState.settings.longBreakDuration);
  }

  private async takeShortBreak(): Promise<void> {
    if (!await invoke('check_focused_window_maximized')) {
      await fullscreenBreak.shortBreak();
    }

    this.resetBreakTimeout(settingState.settings.shortBreakDuration);
  }

  private resetPrepareForBreakTimeout(): void {
    this.clearPrepareForBreakTimeout();
    this.setPrepareForBreakTimeout();
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
    if (
      settingState.settings.notification &&
      !await invoke('check_focused_window_maximized')
    ) {
      await notify(`Take a break in ${settingState.settings.timeToPrepareForBreak} seconds.`);
    }
  };

  private resetBreakTimeout(seconds: Second): void {
    this.clearBreakTimeout();
    this.setBreakTimeout(seconds);
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

  private initBreakWindowListeners(): void {
    listen(BREAK_WINDOW_EVENT.skip, () => {
      this.clearBreakTimeout();
      this.startWork();
    });
  }
}

const timer = new Timer();

export default timer;
