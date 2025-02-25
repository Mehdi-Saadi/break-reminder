import breakMessage from '@/features/break/message';
import settingState from '@/shared/state/setting';
import { availableMonitors, Monitor } from '@tauri-apps/api/window';
import { BreakWindowPayload } from '@/features/break/fullscreen/communication';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { objectToQuery } from '@/shared/url';
import { secondsToMilliseconds } from '@/shared/time';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

interface IWebviewWindowParams {
  x?: number;
  y?: number;
  query: BreakWindowPayload;
}

class FullscreenBreak {
  // TODO: show break message only for largest monitor
  private async getLargestOrFirstMonitor(): Promise<Monitor> {
    const monitors = await availableMonitors();

    return monitors.reduce((previousMonitor, currentMonitor) => {
      if (previousMonitor.scaleFactor === currentMonitor.scaleFactor) {
        return previousMonitor;
      }
      if (previousMonitor.scaleFactor > currentMonitor.scaleFactor) {
        return previousMonitor;
      }
      return currentMonitor;
    });
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
      decorations: import.meta.env.VITE_PRODUCTION === 'false',
      alwaysOnTop: true,
      skipTaskbar: import.meta.env.VITE_PRODUCTION === 'true',
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
    const monitors = await availableMonitors();

    for (const monitor of monitors) {
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
      showSkipBtn: !settingState.settings.strictBreak,
      showPostponeBtn: settingState.settings.allowPostponingBreaks,
    });
  }

  async longBreak(): Promise<void> {
    await this.createFullscreenBreak({
      message: breakMessage.getLongBreakMessage(),
      timeout: secondsToMilliseconds(settingState.settings.longBreakDuration),
      showSkipBtn: !settingState.settings.strictBreak,
      showPostponeBtn: settingState.settings.allowPostponingBreaks,
    });
  }
}

const fullscreenBreak = new FullscreenBreak();

export default fullscreenBreak;
