<script setup>
import { getCategoryFilterAPI,getSubCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Goodsitem from '@/views/Home/components/Goodsitem.vue';
// 获取面包屑导航数据
const categoryData = ref({})
const route = useRoute()
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}
const loading = ref(false)
// 获取基础列表数据渲染
const goodList = ref([])
const reqData=ref({
  categoryId: route.params.id,
  page:1,
  pageSize: 20,
  sortField: 'publishTime',
})
const error = ref('')
const getGoodList = async () => {
  loading.value = true
  try {
    const res = await getSubCategoryAPI(reqData.value)
    console.log(res);
    goodList.value = res.result.items
  } catch (err) {
    console.error('获取商品列表失败:', err)
    error.value = '获取商品列表失败，请稍后重试'
  }
   finally {
    loading.value = false
  }
}
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}
const disabled = ref(false)
  const load = async () => {
  console.log('加载更多数据咯')
  loading.value = true
  try {
    // 获取下一页的数据
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = [...goodList.value, ...res.result.items]
    // 加载完毕 停止监听
    if (res.result.items.length === 0) {
      disabled.value = true
    }
  } catch (err) {
    console.error('加载更多数据失败:', err)
    error.value = '加载更多数据失败，请稍后重试'
    // 恢复页码
    reqData.value.page--
  } finally {
    loading.value = false
  }
}
onMounted(() =>
 {
  getCategoryData()
  getGoodList()
 }
)
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
  <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
  <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
  <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
</el-tabs>

      <div class="body" v-loading="loading" >
        
        <el-alert v-if="error" :title="error" type="error" show-icon></el-alert>
         <!-- 商品列表-->
         <Goodsitem v-for="item in goodList" :key="item.id" :goods="item"></Goodsitem>


        </div>
        <div class="pagination-container">
  <el-button :disabled="disabled" @click="load" v-if="goodList.length">加载更多</el-button>
  <el-empty v-else description="暂无数据"></el-empty>
</div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
