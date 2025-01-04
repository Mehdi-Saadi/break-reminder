import EventBus from '@/core/EventBus.ts';

export const NAVIGATION_PAGES = Object.freeze({
  SETTINGS: 'settings',
  BREAK_MESSAGES: 'break_messages',
  ADVANCED: 'advanced',
});
export type NavigationPage = typeof NAVIGATION_PAGES[keyof typeof NAVIGATION_PAGES];
export const pageNavEventBus = new EventBus<'navigate'>();
