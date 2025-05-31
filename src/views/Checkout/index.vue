<script setup>
import { getCheckoutInfoAPI, createOrderAPI } from '@/apis/checkout'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { ElMessage } from 'element-plus'
const cartStore = useCartStore()
const router = useRouter()
// 获取结算信息
const checkInfo = ref({}) // 订单对象
const curAddress = ref({}) // 默认地址
const getCheckInfo = async () => {
  const res = await getCheckoutInfoAPI()
  checkInfo.value = res.result
  // 适配默认地址
  // 从地址列表中筛选出来 isDefault === 0 那一项
  const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
  curAddress.value = item
}

onMounted(() => getCheckInfo())

// 控制弹框打开
const showDialog = ref(false)
const addFlag = ref(false)

// 切换地址
const activeAddress = ref({})
const switchAddress = (item) => {
  activeAddress.value = item
}
const confirm = () => {
  curAddress.value = activeAddress.value
  showDialog.value = false
  activeAddress.value = {}
}

// 创建订单
const createOrder = async () => {
  const res = await createOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: checkInfo.value.goods.map(item => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  })
  const orderId = res.result.id
  router.push({
    path: '/pay',
    query: {
      id: orderId
    }
  })
  // 更新购物车
  cartStore.updateNewList()
}
// 打开地址对话框
const openAddressDialog = () => {
  showDialog.value = true
}
// 地址表单
const addressForm = ref({
  receiver: '',
  contact: '',
  regionCodes: [],
  address: ''
})

// 省市区数据（实际项目中应从API获取）
const provinceData = ref([])

// 处理地区选择变化
const handleRegionChange = (codes) => {
  addressForm.value.regionCodes = codes
}

// 重置地址表单
const resetAddressForm = () => {
  addressForm.value = {
    receiver: '',
    contact: '',
    regionCodes: [],
    address: ''
  }
}

// 提交地址表单
const submitAddressForm = async () => {
  // 这里应该有表单验证逻辑
  try {
    // 实际应调用 addAddressAPI 添加地址
    addFlag.value = false
    resetAddressForm()
    await getCheckInfo() // 重新获取地址列表
  } catch (error) {
    ElMessage.error('添加地址失败')
  }
}

// 配送时间和支付方式
const deliveryTime = ref('不限送货时间：周一至周日')
const payMethod = ref('在线支付')

// 切换配送时间
const changeDeliveryTime = (time) => {
  deliveryTime.value = time
}

// 切换支付方式
const changePayMethod = (method) => {
  payMethod.value = method
}

// 确认选择的地址
const confirmAddress = () => {
  curAddress.value = activeAddress.value
  showDialog.value = false
}
const submitOrder = () => {
  if (!curAddress.value?.id) {
    ElMessage.warning('请选择收货地址')
    return
  }
  createOrder()
}

</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="Object.keys(curAddress).length === 0">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="openAddressDialog">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间部分 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn" :class="{ active: deliveryTime === '不限送货时间：周一至周日' }" href="javascript:;"
            @click="changeDeliveryTime('不限送货时间：周一至周日')">不限送货时间：周一至周日</a>
          <a class="my-btn" :class="{ active: deliveryTime === '工作日送货：周一至周五' }" href="javascript:;"
            @click="changeDeliveryTime('工作日送货：周一至周五')">工作日送货：周一至周五</a>
          <a class="my-btn" :class="{ active: deliveryTime === '双休日、假日送货：周六至周日' }" href="javascript:;"
            @click="changeDeliveryTime('双休日、假日送货：周六至周日')">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式部分 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn" :class="{ active: payMethod === '在线支付' }" href="javascript:;"
            @click="changePayMethod('在线支付')">在线支付</a>
          <a class="my-btn" :class="{ active: payMethod === '货到付款' }" href="javascript:;"
            @click="changePayMethod('货到付款')">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>

        </div>

        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <!-- 省略 -->
    <div class="addressWrapper">
      <div class="text item" v-for="item in checkInfo.userAddresses" :class="{ active: activeAddress.id === item.id }"
        @click="switchAddress(item)" :key="item.id">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => { showDialog = false }">取消</el-button>

        <el-button type="primary" @click="confirmAddress">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <!-- 添加地址模态框 -->
  <el-dialog v-model="addFlag" title="添加收货地址" width="30%" center>
    <el-form :model="addressForm" label-width="80px">
      <el-form-item label="收货人">
        <el-input v-model="addressForm.receiver" placeholder="请输入收货人姓名" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="addressForm.contact" placeholder="请输入手机号" />
      </el-form-item>
      <!-- 省市区选择器 -->
      <el-form-item label="所在地区">
        <el-cascader v-model="addressForm.regionCodes" :props="{ value: 'code', label: 'name', children: 'areaList' }"
          :options="provinceData" placeholder="请选择省/市/区" @change="handleRegionChange" />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="addressForm.address" type="textarea" placeholder="请输入详细地址" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => { addFlag = false; resetAddressForm() }">取消</el-button>
        <el-button type="primary" @click="submitAddressForm">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>