import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import browserShortcut from '@/shared/browserShortcut';

describe('browserShortcut', () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => document.removeEventListener('contextmenu', () => { }));

  it('should disable context menu when disableContextmenu is called', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    browserShortcut.disableContextmenu();

    expect(addEventListenerSpy).toHaveBeenCalledWith('contextmenu', expect.any(Function));
  });

  it('should disable context menu in production mode', () => {
    vi.stubEnv('VITE_PRODUCTION', 'true');

    const disableContextmenuSpy = vi.spyOn(browserShortcut, 'disableContextmenu');

    browserShortcut.disableAllInProd();

    expect(disableContextmenuSpy).toHaveBeenCalled();
  });

  it('should not disable context menu in non-production mode', () => {
    vi.stubEnv('VITE_PRODUCTION', 'false');

    const disableContextmenuSpy = vi.spyOn(browserShortcut, 'disableContextmenu');

    browserShortcut.disableAllInProd();

    expect(disableContextmenuSpy).not.toHaveBeenCalled();
  });
});
