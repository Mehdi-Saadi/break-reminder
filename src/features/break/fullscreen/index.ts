import { BreakWindowPayload } from '@/features/break/fullscreen/types';
import { availableMonitors, Monitor } from '@tauri-apps/api/window';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { secondsToMilliseconds } from '@/shared/time';
import breakMessage from '@/features/break/message';
import settingState from '@/shared/state/setting';
import { objectToQuery } from '@/shared/url';

interface IWebviewWindowParams {
  x?: number;
  y?: number;
  query: BreakWindowPayload;
}

class FullscreenBreak {
  private monitors: Monitor[] = [];
  private largestMonitor: Monitor | null = null;

  constructor() {
    this.initMonitors();
  }

  private initMonitors = async (): Promise<void> => {
    this.monitors = await availableMonitors();
  };

  // TODO: show break message only for largest monitor
  private getLargestOrFirstMonitor(): Monitor {
    if (!this.largestMonitor) {
      this.largestMonitor = this.monitors.reduce((previousMonitor, currentMonitor) => {
        if (previousMonitor.scaleFactor === currentMonitor.scaleFactor) {
          return previousMonitor;
        }
        if (previousMonitor.scaleFactor > currentMonitor.scaleFactor) {
          return previousMonitor;
        }
        return currentMonitor;
      });
    }

    return this.largestMonitor;
  }

  private createWebviewWindow(
    params: IWebviewWindowParams
  ): WebviewWindow {
    const windowUniqueLabel = `break-window-${generateRandomAlphabeticId()}`;
    const queryParams = params.query ? objectToQuery(params.query) : '';

    return new WebviewWindow(windowUniqueLabel, {
      x: params.x,
      y: params.y,
      maximized: true,
      decorations: !import.meta.env.PROD,
      alwaysOnTop: true,
      skipTaskbar: import.meta.env.PROD,
      resizable: false,
      focus: true,
      visible: false,
      transparent: true,
      url: `/src/features/break/fullscreen/window/index.html${queryParams}`,
    });
  }

  private async createFullscreenBreak(
    breakWindowPayload: BreakWindowPayload
  ): Promise<void> {
    for (const monitor of this.monitors) {
      const breakWindow = this.createWebviewWindow({
        x: monitor.position.x,
        y: monitor.position.y,
        query: breakWindowPayload,
      });

      await breakWindow.once('tauri://created', async (): Promise<void> => await breakWindow.show());

      await breakWindow.once('tauri://error', error => {
        console.error('Error while creating window:', breakWindow, error);
      });
    }
  }

  async shortBreak(): Promise<void> {
    await this.createFullscreenBreak({
      message: breakMessage.getShortBreakMessage(),
      timeout: secondsToMilliseconds(settingState.settings.shortBreakDuration),
    });
  }

  async longBreak(): Promise<void> {
    await this.createFullscreenBreak({
      message: breakMessage.getLongBreakMessage(),
      timeout: secondsToMilliseconds(settingState.settings.longBreakDuration),
    });
  }
}

const fullscreenBreak = new FullscreenBreak();

export default fullscreenBreak;
