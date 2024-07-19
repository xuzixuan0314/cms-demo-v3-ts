import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/db/user'
import { firstMenu } from '@/utils/menu'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('@/views/404/404.vue')
    }
  ]
})
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = getToken()
  if (to.path.startsWith('/home') && !token) {
    return '/login'
  }
  if (to.path.startsWith('/home')) {
    return firstMenu.url
  }
})
export default router
