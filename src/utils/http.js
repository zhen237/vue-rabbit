// axios基础封装
import axios from "axios";
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from "@/stores/user";
import router from "@/router";
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 20000
})

// axios请求拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  const message = e.response?.data?.message || '服务器异常'
  
  // 401 特殊处理（token失效）
  if (e.response?.status === 401) {
    // 清除用户信息
    const userStore = useUserStore()
    userStore.clearUserInfo()
    // 跳转到登录页
    router.push('/login')
    ElMessage({
      type: 'error',
      message: '登录状态已过期，请重新登录'
    })
  } else {
    // 其他错误提示
    ElMessage({
      type: 'warning',
      message
    })
  }
  
  return Promise.reject(e)
})



export default httpInstance
