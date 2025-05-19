import request from '@/utils/http'


export  default function getDetail(id){
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return request({
    url:'/goods/hot',
    params:{
      id, 
      type, 
      limit
    }
  })
}