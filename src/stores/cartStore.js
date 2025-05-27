// 封装购物车模块

import { defineStore } from 'pinia'
import { ref ,computed} from 'vue'
import { useUserStore } from '@/stores/user'
import { insertCartAPI, delCartAPI, getCartListAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
const userStore = useUserStore()
const isLogin = computed(() => userStore.userInfo.token)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = async(goods) => {
  console.log('添加', goods)
  if (isLogin.value) {
    // 登录之后的加入购车逻辑
    await insertCartAPI({ skuId: goods.skuId, count: goods.count })
    updateNewList()
  } else {
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
  }
}

  // 删除购物车中的商品
  // 删除购物车
  const delCart = async (skuId) => {
  if (isLogin.value) {
    // 调用接口实现接口购物车中的删除功能
    await delCartAPI([skuId])
    updateNewList()
  } else {
    // 思路：
    // 1. 找到要删除项的下标值 - splice
    // 2. 使用数组的过滤方法 - filter
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }
}
// 清空购物车
const clearCart = async () => {
  if (isLogin.value) {
    // 调用接口实现清空购物车功能
    // 这里需要获取所有商品的skuId，然后调用删除接口
    const ids = cartList.value.map(item => item.skuId)
    await delCartAPI(ids)
    updateNewList()
  } else {
    // 本地购物车直接清空数组
    cartList.value = []
  }
}
// 合并本地购物车
// 合并本地购物车
const mergeLocalCart = async () => {
  // 判断是否有本地购物车数据
  if (cartList.value.length === 0) return
  
  // 循环将本地购物车数据添加到服务器
  const promiseArr = cartList.value.map(item => {
    return insertCartAPI({
      skuId: item.skuId,
      count: item.count
    })
  })
  
  // 等待所有请求完成
  await Promise.all(promiseArr)
  
  // 更新购物车列表
  updateNewList()
  
  // 清空本地购物车
  cartList.value = []
}


const cartTotal = computed(() => {
  return cartList.value.reduce((prev, item) => prev + item.count, 0)
})
const cartTotalPrice = computed(() => {
  return cartList.value.reduce((prev, item) => prev + item.count * item.price, 0)
})
const singleCheck = (skuId, selected) => {
  // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
  const item = cartList.value.find((item) => item.skuId === skuId)
  if (item) {
    item.selected = selected
  }
}

const allCheck = (selected) => {
  // 把cartList中的每一项的selected都设置为当前的全选框状态
  if (cartList.value && cartList.value.length) {
    cartList.value.forEach(item => item.selected = selected)
  }
}
// 合并本地购物车




// 是否全选计算属性
const isAllChecked = computed(() => cartList.value.length > 0 && cartList.value.every((item) => item.selected))


// 3. 已选择数量
const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
// 4. 已选择商品价钱合计
const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
// 获取最新购物车列表
const updateNewList = async () => {
  // 这里应该调用获取购物车列表的API
  const res = await getCartListAPI()
  cartList.value = res.result
}

// 在return中添加delCart方法
return {
  cartList,
  addCart,
  delCart,
  cartTotal,
  cartTotalPrice,
  singleCheck,
  allCheck,
  isAllChecked,
  selectedCount,
  selectedPrice,
  updateNewList,
  clearCart,
  mergeLocalCart,
}
},{
  persist: true,
})