import EventBus from '@/shared/event/EventBus.ts';

export type NavigationPage = 'general' | 'break_schedule' | 'behavior' | 'break_messages' | 'advanced';
export const pageNavEventBus = new EventBus<'navigate'>();
