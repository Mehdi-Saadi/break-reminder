import routes from '@/main/router/routes';
import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
