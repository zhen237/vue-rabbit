import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {//一级路由
      path: '/',

      component: Layout,
      children: [
        // 二级路由
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/Detail/index.vue')
    }

  ],

})

export default router
