import EventBus from '@/core/EventBus.ts';

export type NavigationPage = 'settings' | 'break_messages' | 'advanced';
export const pageNavEventBus = new EventBus<'navigate'>();
