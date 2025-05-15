import httpInstance from "@/utils/http";
export function getBannerAPI() {
  return httpInstance({
    url: 'home/banner'
  })
}
export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}
export const getHotAPI = () => {
  return httpInstance({
    url: 'home/hot',    // 接口路径
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
