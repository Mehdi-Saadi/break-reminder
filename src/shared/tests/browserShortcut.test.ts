import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import browserShortcut from '@/shared/browserShortcut';

vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_PRODUCTION: 'false',
    },
  },
});

describe('browserShortcut', () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => document.removeEventListener('contextmenu', () => { }));

  it('disables contextmenu', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    browserShortcut.disableContextmenu();

    expect(addEventListenerSpy).toHaveBeenCalledWith('contextmenu', expect.any(Function));
  });
});
