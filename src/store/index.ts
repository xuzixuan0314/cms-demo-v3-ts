import { createPinia } from 'pinia'
import { useUserStore } from './modules/userStore'
import type { App } from 'vue'
export const usePinia = {
  install(app: App<Element>) {
    const pinia = createPinia()
    app.use(pinia)
    // 添加动态路由,保证每次刷新页面时候都能重新加载
    // 此操作需要在app.use(pinia)之后,并且在app.use(router)之前
    const userStore = useUserStore()
    userStore.loadLocalCache()
  }
}

export * from './modules/userStore'
