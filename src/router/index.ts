import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
      meta: { title: 'Даосская культивация — в реальности · m13' },
    },
    {
      path: '/learning',
      name: 'learning',
      component: () => import('@/views/LearningView.vue'),
      meta: { title: 'Как проходит обучение · m13' },
    },
    {
      path: '/program',
      name: 'program',
      component: () => import('@/views/StructureView.vue'),
      meta: { title: 'Программа · m13' },
    },
    {
      path: '/path',
      redirect: (to) => ({ path: '/program', hash: to.hash }),
    },
    {
      path: '/prices',
      name: 'prices',
      component: () => import('@/views/PricesView.vue'),
      meta: { title: 'Цены · m13' },
    },
    {
      path: '/media',
      name: 'media',
      component: () => import('@/views/MediaView.vue'),
      meta: { title: 'Медиа · m13' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'О нас · m13' },
    },
    {
      path: '/enter',
      name: 'enter',
      component: () => import('@/views/EnterView.vue'),
      meta: { title: 'Регистрация и вход · m13' },
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('@/views/CabinetView.vue'),
      meta: { title: 'Личный кабинет · m13', requiresAuth: true },
    },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { path: '/enter', query: { redirect: to.fullPath } }
  }
  if (to.name === 'enter' && isAuthenticated.value) {
    return { path: '/cabinet' }
  }
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'm13'
})

export default router
