<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
      </div>
      <!-- 插槽 -->
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;
  padding: 30px 20px;
  margin-top: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 40px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      line-height: 40px;
      margin-left: 6px;
      small {
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }
}
</style>

