import EventBus from '@/core/EventBus.ts'

export const NAVIGATION_EVENTS = Object.freeze({
  NAVIGATE: 'navigate',
});
export type NavigationPage = 'settings' | 'break_messages' | 'advanced';
export const pageNavEventBus = new EventBus();
