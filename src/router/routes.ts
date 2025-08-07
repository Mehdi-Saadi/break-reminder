import App from '@/layouts/App.vue';
import BreakSchedule from '@/views/BreakSchedule.vue';
import General from '@/views/General.vue';
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
        component: General,
      },
      {
        path: 'notification-alerts',
        name: 'notification-alerts',
        component: General,
      },
      {
        path: 'break-messages',
        name: 'break-messages',
        component: General,
      },
      {
        path: 'about',
        name: 'about',
        component: General,
      },
    ],
  },
];

export default routes;
