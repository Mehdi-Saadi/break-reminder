import EventBus from '@/app/EventBus.ts';

export type NavigationPage = 'settings' | 'break_messages' | 'advanced';
export const pageNavEventBus = new EventBus<'navigate'>();

export const settingStateEventBus = new EventBus<'change'>();
