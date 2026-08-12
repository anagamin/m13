import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
      meta: { title: 'INBI · Внутренняя алхимия' },
    },
    {
      path: '/path',
      name: 'path',
      component: () => import('@/views/StructureView.vue'),
      meta: { title: 'Структура знаний · INBI' },
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('@/views/CabinetView.vue'),
      meta: { title: 'Личный кабинет · INBI' },
    },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || 'INBI'
  document.title = title
})

export default router
