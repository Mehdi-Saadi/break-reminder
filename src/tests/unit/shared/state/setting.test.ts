import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { settingStateEventBus } from '@/shared/event/setting.ts';
import settingState from '@/shared/state/setting';
import { UUID } from '@/shared/crypto';

describe('SettingState', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(settingStateEventBus, 'emit');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default settings if localStorage is empty', () => {
    expect(settingState.settings).toMatchObject({
      shortBreakDuration: 20,
      shortWorkDuration: 20,
      longBreakDuration: 120,
      countOfShortWorksForLongBreak: 3,
      timeToPrepareForBreak: 10,
      strictBreak: false,
      allowPostponingBreaks: false,
      postponeDuration: 5,
      doNotDisturb: true,
      notification: true,
      audibleAlert: true,
      selectedAudio: null,
      smartPause: true,
      screensaver: true,
      darkMode: false,
    });
  });

  it('should update settings and save to localStorage', () => {
    settingState.settings = { darkMode: true };
    expect(settingState.settings.darkMode).toBe(true);
    expect(JSON.parse(localStorage.getItem('settings') || '')).toMatchObject({ darkMode: true });
    expect(settingStateEventBus.emit).toHaveBeenCalledWith('change');
  });

  it('should return a break message by ID', () => {
    const id: UUID = '88027327-d0a0-42c3-a990-363e865d49e3';
    expect(settingState.getBreakMessageById(id)).toBe('Tightly close your eyes');
  });

  it('should update a break message by ID', () => {
    const id: UUID = '88027327-d0a0-42c3-a990-363e865d49e3';
    const newMsg = 'New Message';
    settingState.updateBreakMessageById(id, newMsg);
    expect(settingState.getBreakMessageById(id)).toBe(newMsg);
  });

  it('should remove a break message by ID', () => {
    const id: UUID = '88027327-d0a0-42c3-a990-363e865d49e3';
    settingState.removeBreakMessageById(id);
    expect(settingState.getBreakMessageById(id)).toBe('');
  });
});
