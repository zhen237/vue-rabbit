import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout';
export const useCategoryStore = defineStore('category', () => {
  // 导航列表的数据管理
  // state导航数据列表

  const categoryList = ref([])
  // action获取导航数据列表的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log(res)
    categoryList.value = res.result
  }
  return { categoryList, getCategory }
})
