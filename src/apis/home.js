import httpInstance from "@/utils/http";
export function getBannerAPI (params = {}) {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}
export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot',    // 接口路径
    method: 'get',      // 请求方法
    params: {}          // GET请求参数（可选）
    // data: {}         // POST请求体（若为POST需替换为data）
  });
};
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}
