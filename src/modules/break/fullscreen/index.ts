import breakMessage from '@/modules/break/message';
import settingState from '@/shared/state/setting';
import { availableMonitors, Monitor } from '@tauri-apps/api/window';
import { IBreakWindowPayload } from '@/modules/break/fullscreen/communication';
import { generateRandomAlphabeticId } from '@/shared/crypto';
import { objectToQuery } from '@/shared/url';
import { secondsToMilliseconds } from '@/shared/time';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

interface IWebviewWindowParams {
  monitor: Monitor;
  query: IBreakWindowPayload;
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
      x: params.monitor.position.x,
      y: params.monitor.position.y,
      fullscreen: true,
      decorations: import.meta.env.VITE_PRODUCTION === 'false',
      alwaysOnTop: true,
      skipTaskbar: import.meta.env.VITE_PRODUCTION === 'true',
      resizable: false,
      focus: true,
      visible: false,
      transparent: true,
      url: `/src/modules/break/fullscreen/window/index.html${queryParams}`,
    });
  }

  private async createFullscreenBreak(
    breakWindowPayload: IBreakWindowPayload
  ): Promise<void> {
    const monitors = await availableMonitors();

    for (const monitor of monitors) {
      const breakWindow = this.createWebviewWindow({
        monitor,
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
      timeout: secondsToMilliseconds(settingState.value.shortBreakDuration),
      showSkipBtn: !settingState.value.strictBreak,
      showPostponeBtn: settingState.value.allowPostponingBreaks,
    });
  }

  async longBreak(): Promise<void> {
    await this.createFullscreenBreak({
      message: breakMessage.getLongBreakMessage(),
      timeout: secondsToMilliseconds(settingState.value.longBreakDuration),
      showSkipBtn: !settingState.value.strictBreak,
      showPostponeBtn: settingState.value.allowPostponingBreaks,
    });
  }
}

const fullscreenBreak = new FullscreenBreak();

export default fullscreenBreak;
