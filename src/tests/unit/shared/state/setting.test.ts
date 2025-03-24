import settingState from '@/shared/state/setting';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import { UUID } from '@/shared/crypto';

describe('SettingState', () => {
  // Mock localStorage
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { });
  });

  it('should initialize with default settings', () => {
    expect(settingState.value).toBeDefined();
    expect(settingState.value.shortBreakDuration).toBe(20);
    expect(settingState.value.longBreakMessages).toHaveProperty('b077fa44-9219-4bfc-a665-2e3a87a95727');
  });

  it('should return a break message by ID', () => {
    const message = settingState.getBreakMessageById('b077fa44-9219-4bfc-a665-2e3a87a95727' as UUID);
    expect(message).toBe('Walk for a while');
  });

  it('should update a break message by ID', () => {
    const id = 'b077fa44-9219-4bfc-a665-2e3a87a95727' as UUID;
    settingState.updateBreakMessageById(id, 'Go outside for fresh air');
    expect(settingState.getBreakMessageById(id)).toBe('Go outside for fresh air');
  });

  it('should remove a break message by ID', () => {
    const id = 'b077fa44-9219-4bfc-a665-2e3a87a95727' as UUID;
    settingState.removeBreakMessageById(id);
    expect(settingState.getBreakMessageById(id)).toBe('');
  });

  it('should save updated settings to localStorage', () => {
    settingState.value.strictBreak = true;
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
