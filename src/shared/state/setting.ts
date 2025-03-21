import { settingStateEventBus } from '@/shared/event/setting.ts';
import { BreakMessages } from '@/shared/types';
import { Minute, Second } from '@/shared/time';
import { UUID } from '@/shared/crypto';

interface ISettings {
  // short break
  shortBreakDuration: Second;
  shortWorkDuration: Minute;

  // long break
  longBreakDuration: Second;
  countOfShortWorksForLongBreak: number;

  // options
  timeToPrepareForBreak: Second;
  strictBreak: boolean;
  allowPostponingBreaks: boolean;
  postponeDuration: Minute;

  // advanced
  autostart: boolean;
  doNotDisturb: boolean;
  notification: boolean;
  audibleAlert: boolean;
  selectedAudio: string | null;
  smartPause: boolean;
  screensaver: boolean;
  darkMode: boolean;

  shortBreakMessages: BreakMessages;
  longBreakMessages: BreakMessages;
}

class SettingState {
  private readonly _storageKey = 'settings';
  private _settings: ISettings;
  private _defaultSettings = Object.freeze<ISettings>({
    shortBreakDuration: 20 as Second,
    shortWorkDuration: 20 as Minute,
    longBreakDuration: 120 as Second,
    countOfShortWorksForLongBreak: 3,
    timeToPrepareForBreak: 10 as Second,
    strictBreak: false,
    allowPostponingBreaks: false,
    postponeDuration: 5 as Minute,
    autostart: true,
    doNotDisturb: true,
    notification: true,
    audibleAlert: true,
    selectedAudio: null,
    smartPause: true,
    screensaver: true,
    darkMode: false,
    shortBreakMessages: {
      '88027327-d0a0-42c3-a990-363e865d49e3': 'Tightly close your eyes',
      'db36bc4b-6d4f-42d2-a10f-f31f8fd8fe8d': 'Roll your eyes a few times to each side',
      '60981702-125f-411b-ac70-98fc6b7a5c8c': 'Rotate your eyes in clockwise direction',
      'a1416a32-977d-4035-832b-30245bb9444b': 'Rotate your eyes in counterclockwise direction',
      '6d18d092-2f49-4e16-99b0-f95538f6c479': 'Blink your eyes',
      '141dfbfc-6f24-4fac-84ab-0835b0f11584': 'Focus on a point in the far distance',
      '707748c5-4629-47f8-9ed7-e94db77632e9': 'Have some water',
    },
    longBreakMessages: {
      'b077fa44-9219-4bfc-a665-2e3a87a95727': 'Walk for a while',
      'aa88fa9a-51a3-40a7-b8a3-35a7bdf247d0': 'Lean back at your seat and relax',
    },
  });

  private getSettings(): ISettings {
    const localData = localStorage.getItem(this._storageKey);

    if (!localData) {
      return { ...this._defaultSettings };
    }

    try {
      const parsedData = JSON.parse(localData);

      for (const key in parsedData) {
        if (!(key in this._defaultSettings)) {
          return { ...this._defaultSettings };
        }
      }

      return { ...this._defaultSettings, ...parsedData };
    } catch {
      return { ...this._defaultSettings };
    }
  }

  private saveSettingsToStorage(): void {
    localStorage.setItem(this._storageKey, JSON.stringify(this._settings));
  }

  constructor() {
    this._settings = this.getSettings();
  }

  get settings(): ISettings {
    return this._settings;
  }

  set settings(value: Partial<ISettings>) {
    this._settings = { ...this._settings, ...value };

    this.saveSettingsToStorage();

    settingStateEventBus.emit('change');
  }

  getBreakMessageById(id: UUID): string {
    return this._settings.shortBreakMessages[id] || this._settings.longBreakMessages[id] || '';
  }

  updateBreakMessageById(id: UUID, newValue: string): void {
    const shortBreakMessages: BreakMessages = { ...this._settings.shortBreakMessages };
    const longBreakMessages: BreakMessages = { ...this._settings.longBreakMessages };

    if (shortBreakMessages[id]) {
      shortBreakMessages[id] = newValue;
    } else if (longBreakMessages[id]) {
      longBreakMessages[id] = newValue;
    }

    this.settings = {
      shortBreakMessages: shortBreakMessages,
      longBreakMessages: longBreakMessages,
    };
  }

  removeBreakMessageById(id: UUID): void {
    const shortBreakMessages = { ...this._settings.shortBreakMessages };
    const longBreakMessages = { ...this._settings.longBreakMessages };

    if (shortBreakMessages[id]) {
      delete shortBreakMessages[id];
    } else if (longBreakMessages[id]) {
      delete longBreakMessages[id];
    }

    this.settings = {
      shortBreakMessages: shortBreakMessages,
      longBreakMessages: longBreakMessages,
    };
  }
}

const settingState = new SettingState();

export default settingState;
