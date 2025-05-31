import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives'
import { componentPlugin } from '@/components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
app.use(VueLazyload, {
  loading: '/path-to-loading-image.png', // 可选：加载占位图
  error: '/path-to-error-image.png'      // 可选：错误占位图
});
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


