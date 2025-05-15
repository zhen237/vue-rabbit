<script setup>
import HomePanel from './HomePanel.vue'
import { getNewAPI } from '@/apis/home'
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

let cancelToken
const newList = ref([])
const getNewList = async () => {
  // 创建一个新的cancelToken
  cancelToken = axios.CancelToken.source()

  try {
    const res = await getNewAPI({ cancelToken: cancelToken.token })
    newList.value = res.result
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
    } else {
      console.error('Failed to fetch new list:', error)
    }
  }
}

onMounted(() => getNewList())
onUnmounted(() => {
  if (cancelToken) {
    cancelToken.cancel('Component unmounted, request canceled')
  }
})
</script>


<template>
   <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #main>
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
