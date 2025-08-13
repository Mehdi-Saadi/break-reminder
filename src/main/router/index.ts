import routes from '@/main/router/routes';
import { createWebHashHistory, createRouter } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
