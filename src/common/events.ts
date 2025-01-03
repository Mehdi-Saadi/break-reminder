import EventBus from '@/core/EventBus.ts'

export const NAVIGATION_EVENTS = Object.freeze({
  NAVIGATE: 'navigate',
});
export const pageNavEventBus = new EventBus();
