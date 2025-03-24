import { describe, it, expect, vi } from 'vitest';
import State from '@/shared/state';

describe('State', () => {
  it('should initialize with the given value', () => {
    const state = new State(10);
    expect(state.value).toBe(10);
  });

  it('should update the state value', () => {
    const state = new State(10);
    state.value = 20;
    expect(state.value).toBe(20);
  });

  it('should notify subscribers when the state changes', () => {
    const state = new State(10);
    const subscriber = vi.fn();

    state.subscribe(subscriber);
    state.value = 20;

    expect(subscriber).toHaveBeenCalledWith(20, 10);
  });

  it('should allow subscribers to unsubscribe', () => {
    const state = new State(10);
    const subscriber = vi.fn();
    const unsubscribe = state.subscribe(subscriber);

    expect(unsubscribe()).toBe(true); // Unsubscribe should return true
    state.value = 20;

    expect(subscriber).not.toHaveBeenCalled();
  });

  it('should initialize with the given object value', () => {
    const initialState = { count: 10, nested: { value: 42 } };
    const state = new State(initialState);
    expect(state.value).toEqual(initialState);
  });

  it('should update the state value with an object', () => {
    const state = new State({ count: 10 });
    state.value = { count: 20 };
    expect(state.value).toEqual({ count: 20 });
  });

  it('should notify subscribers when the state object changes', () => {
    const state = new State({ count: 10 });
    const subscriber = vi.fn();

    state.subscribe(subscriber);
    state.value = { count: 20 };

    expect(subscriber).toHaveBeenCalledWith({ count: 20 }, { count: 10 });
  });

  it('should allow subscribers to unsubscribe', () => {
    const state = new State({ count: 10 });
    const subscriber = vi.fn();
    const unsubscribe = state.subscribe(subscriber);

    expect(unsubscribe()).toBe(true); // Unsubscribe should return true
    state.value = { count: 20 };

    expect(subscriber).not.toHaveBeenCalled();
  });

  it('should prevent direct modification of the state object', () => {
    const state = new State({ count: 10, nested: { value: 42 } });
    const returnedValue = state.value;

    // Modify the returned object
    returnedValue.count = 999;
    returnedValue.nested.value = 999;

    // Ensure the actual state did not change
    expect(state.value.count).toBe(10);
    expect(state.value.nested.value).toBe(42);
  });
});
