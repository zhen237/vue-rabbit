import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'


export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref({})
  
  // 获取用户信息
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    localStorage.setItem('userInfo', JSON.stringify(res.result))
     const { useCartStore } = await import('@/stores/cartStore')
     const cartStore = useCartStore()
  await cartStore.mergeLocalCart()
    return res
  }
  
  // 初始化时从本地存储中恢复用户信息
  const storedUserInfo = localStorage.getItem('userInfo')
  if (storedUserInfo) {
    userInfo.value = JSON.parse(storedUserInfo)
  }

  // 清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    localStorage.removeItem('userInfo')
  }
  
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})
