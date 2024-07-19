import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { usePinia } from './store'
// 导入样式
import 'normalize.css'
import '@/style/index.js'
// 全局引入element-icon
import ElementIcon from '@/components/element-icon'
const app = createApp(App)

app.use(usePinia)
app.use(ElementIcon)
app.use(router)
app.mount('#app')
