import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import CartList from '@/views/CartList/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import Userinfo from '@/views/Member/components/Userinfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
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
          component:() => import('@/views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback', // 注意路径，必须是paycallback
          component: PayBack
        },
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: '',
              component:Userinfo
            },
            {
              path: 'user',  // 添加 user 路径
              component:Userinfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }



      ]
    },
    {
      path: '/login',
      component: Login,
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})
export default router
