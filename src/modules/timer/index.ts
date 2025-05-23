import breakAudio from '@/modules/break/audio';
import breakNotification from '@/modules/break/notification';
import fullscreenBreak from '@/modules/break/fullscreen';
import settingState from '@/shared/state/setting';
import { BREAK_WINDOW_EVENT } from '@/modules/break/fullscreen/communication';
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

  private resetWorkTimeout(): void {
    this.clearWorkTimeout();
    this.setWorkTimeout();
  }

  private clearWorkTimeout(): void {
    if (this.workTimeout) {
      clearTimeout(this.workTimeout);
      this.workTimeout = null;
    }
  }

  private setWorkTimeout(): void {
    this.workTimeout = setTimeout(
      this.takeBreakIfNeeded,
      minutesToMilliseconds(settingState.value.shortWorkDuration)
    );
  }

  private takeBreakIfNeeded = async (): Promise<void> => {
    // if focused window is maximized, skip break and start work again
    if (
      settingState.value.doNotDisturb &&
      await invoke('check_focused_window_fullscreen')
    ) {
      this.startWork();
    } else {
      await this.takeBreak();
    }
  };

  private async takeBreak(): Promise<void> {
    this.countOfShortWorks++;

    if (this.shouldTakeLongBreak()) {
      await this.takeLongBreak();
    } else {
      await this.takeShortBreak();
    }

    await breakAudio.playPreBreakAudio();
  }

  private shouldTakeLongBreak(): boolean {
    if (this.countOfShortWorks >= settingState.value.countOfShortWorksForLongBreak) {
      this.countOfShortWorks = 0;
      return true;
    }
    return false;
  }

  private async takeLongBreak(): Promise<void> {
    await fullscreenBreak.longBreak();

    this.resetBreakTimeout(settingState.value.longBreakDuration);
  }

  private async takeShortBreak(): Promise<void> {
    await fullscreenBreak.shortBreak();

    this.resetBreakTimeout(settingState.value.shortBreakDuration);
  }

  private resetBreakTimeout(seconds: Second): void {
    this.clearBreakTimeout();
    this.setBreakTimeout(seconds);
  }

  private clearBreakTimeout(): void {
    if (this.breakTimeout) {
      clearTimeout(this.breakTimeout);
      this.breakTimeout = null;
    }
  }

  private setBreakTimeout(seconds: Second): void {
    this.breakTimeout = setTimeout(
      this.startWork,
      secondsToMilliseconds(seconds)
    );
  }

  private resetPrepareForBreakTimeout(): void {
    this.clearPrepareForBreakTimeout();
    this.setPrepareForBreakTimeout();
  }

  private clearPrepareForBreakTimeout(): void {
    if (this.prepareForBreakTimeout) {
      clearTimeout(this.prepareForBreakTimeout);
      this.prepareForBreakTimeout = null;
    }
  }

  private setPrepareForBreakTimeout(): void {
    const workTime = minutesToMilliseconds(settingState.value.shortWorkDuration);
    const prepareTime = secondsToMilliseconds(settingState.value.timeToPrepareForBreak);
    const prepareForBreakTime = workTime - prepareTime;

    this.prepareForBreakTimeout = setTimeout(breakNotification.show, prepareForBreakTime);
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
