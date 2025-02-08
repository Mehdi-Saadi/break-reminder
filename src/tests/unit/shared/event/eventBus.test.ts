import { describe, it, expect, vi } from 'vitest';
import EventBus from '@/shared/event/EventBus';

describe('EventBus', () => {
  it('should register and call event handlers', () => {
    const bus = new EventBus<'test'>();
    const handler = vi.fn();

    bus.on('test', handler);
    bus.emit('test', 'payload');

    expect(handler).toHaveBeenCalledWith('payload');
  });

  it('should not call handlers for other events', () => {
    const bus = new EventBus<'event1' | 'event2'>();
    const handler = vi.fn();

    bus.on('event1', handler);
    bus.emit('event2', 'payload');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should allow multiple handlers for the same event', () => {
    const bus = new EventBus<'multi'>();
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    bus.on('multi', handler1);
    bus.on('multi', handler2);
    bus.emit('multi', 'data');

    expect(handler1).toHaveBeenCalledWith('data');
    expect(handler2).toHaveBeenCalledWith('data');
  });
});
