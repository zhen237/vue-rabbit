import{ref,onMounted} from 'vue'
import { getBannerAPI } from '@/apis/home'





 export function useBanner(){
  const bannerList = ref([])
const getBanner = async () => {
  console.log('Requesting banner data...')
  try {
    const res = await getBannerAPI(
      {distributionSite:'2'}
    )
    console.log('Banner API response:', res)
    if (res && res.result) {
      bannerList.value = res.result
      console.log('Banner list updated:', bannerList.value)
    } else {
      console.warn('Banner API returned unexpected data structure:', res)
    }
  } catch (error) {
    console.error('Banner API request failed:', error)
  }
}

onMounted(() => getBanner())
return {
  bannerList,

}
}

