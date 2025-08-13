import App from '@/main/layouts/App.vue';
import About from '@/main/views/About.vue';
import Behavior from '@/main/views/Behavior.vue';
import BreakMessages from '@/main/views/BreakMessages.vue';
import BreakSchedule from '@/main/views/BreakSchedule.vue';
import General from '@/main/views/General.vue';
import NotificationAlert from '@/main/views/NotificationAlert.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: App,
    redirect: { name: 'general' },
    children: [
      {
        path: 'general',
        name: 'general',
        component: General,
      },
      {
        path: 'break-schedule',
        name: 'break-schedule',
        component: BreakSchedule,
      },
      {
        path: 'behavior',
        name: 'behavior',
        component: Behavior,
      },
      {
        path: 'notification-alerts',
        name: 'notification-alerts',
        component: NotificationAlert,
      },
      {
        path: 'break-messages',
        name: 'break-messages',
        component: BreakMessages,
      },
      {
        path: 'about',
        name: 'about',
        component: About,
      },
    ],
  },
];

export default routes;
