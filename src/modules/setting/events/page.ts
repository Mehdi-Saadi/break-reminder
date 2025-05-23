import EventBus from '@/shared/event/EventBus.ts';

export type NavigationPage = 'general' | 'break_schedule' | 'behavior' | 'notification' | 'break_messages' | 'about';
export const pageNavEventBus = new EventBus<'navigate'>();
