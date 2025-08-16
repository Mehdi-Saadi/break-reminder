import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/main/router/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
