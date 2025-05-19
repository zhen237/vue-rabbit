import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import { getCategory } from '@/apis/testAPI'
import { lazyPlugin } from './directives'
import { componentPlugin } from '@/components'
getCategory().then((res) => {
  console.log(res)
})
const app = createApp(App)
app.use(VueLazyload, {
  loading: '/path-to-loading-image.png', // 可选：加载占位图
  error: '/path-to-error-image.png'      // 可选：错误占位图
});
app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


