import { onBeforeRouteUpdate } from 'vue-router'
import {getTopCategoryAPI} from '@/apis/category'
import { ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id=route.params.id) => {
    // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(()=>getCategory())
  onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据

    console.log('路由更新了')
    getCategory(to.params.id)
  })
  return {
    categoryData,

  }
}
