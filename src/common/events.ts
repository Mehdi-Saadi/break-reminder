import EventBus from '@/core/EventBus.ts'

export const NAVIGATION_EVENTS = Object.freeze({
  SETTINGS: 'settings',
  BREAK_MESSAGES: 'break_messages',
  ADVANCED: 'advanced',
});
export const pageNavEventBus = new EventBus();
