import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout';

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const isLoading = ref(false)

  const getCategory = async () => {
    // 如果已经在加载中或已有数据，则不重复请求
    if (isLoading.value || categoryList.value.length > 0) return

    isLoading.value = true
    try {
      const res = await getCategoryAPI()
      categoryList.value = res.result
    } catch (error) {
      console.error('Failed to fetch category data:', error)
    } finally {
      isLoading.value = false
    }
  }

  return { categoryList, getCategory }
})
