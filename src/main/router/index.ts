import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/main/router/routes'
import { useClarity } from '@/shared/composables/clarity'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const { identify } = useClarity()

router.afterEach(identify)

export default router
