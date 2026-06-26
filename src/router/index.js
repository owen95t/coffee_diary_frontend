import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { pinia } from '@/stores'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Coffee Diary' },
  },
  {
    path: '/login',
    name: 'Login to Coffee Diary',
    component: () => import('../views/LoginSimple.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/UserDashboard.vue'),
    meta: {
      title: 'Coffee Diary Dashboard',
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register for Coffee Diary',
    component: () => import('../views/RegisterSimple.vue'),
    meta: { title: 'Register' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  document.title = to.meta.title ?? 'Coffee Diary'

  const appStore = useAppStore(pinia)

  if (!appStore.sessionChecked) {
    await appStore.checkSession()
  }

  if (to.meta.requiresAuth && !appStore.isLoggedIn) {
    return { path: '/login' }
  }

  if (appStore.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    return { path: '/dashboard' }
  }

  return true
})

export default router