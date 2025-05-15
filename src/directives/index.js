import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install (app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
              el.src = binding.value
              stop()
            }
          },
        )
        // 保存stop函数以便在卸载时调用
        el._observer_stop = stop
      },
      unmounted(el) {
        // 在卸载时停止观察
        if (el._observer_stop) {
          el._observer_stop()
        }
      }

    })

  }
}
