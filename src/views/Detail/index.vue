<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 假设有一个API用于获取商品详情
// import { getDetailAPI } from '@/apis/detail'

const route = useRoute()
const productId = route.params.id
const productDetail = ref({})

const getProductDetail = async () => {
  try {
    // 这里应该调用获取详情的API
    // const res = await getDetailAPI(productId)
    // productDetail.value = res.result
    console.log('获取商品ID:', productId)
  } catch (error) {
    console.error('Failed to fetch product detail:', error)
  }
}

onMounted(() => getProductDetail())
</script>

<template>
  <div class="detail-container">
    <h2>商品详情页</h2>
    <p>商品ID: {{ productId }}</p>
    <!-- 这里展示商品详情 -->
  </div>
</template>

<style scoped lang="scss">
.detail-container {
  padding: 20px;
  background-color: #fff;
}
</style>
