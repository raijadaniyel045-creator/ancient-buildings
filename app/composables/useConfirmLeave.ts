// composables/useConfirmLeave.js
export function useConfirmLeave(isDirty: Ref<boolean>) {
  // 1. 处理浏览器刷新/关闭
  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    if (isDirty.value) {
      e.preventDefault()
      e.returnValue = '' // 现代浏览器必须设置该值才能触发弹窗
    }
  }

  onMounted(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnloadHandler)
  })

  // 2. 处理路由跳转
  onBeforeRouteLeave((to, from, next) => {
    if (isDirty.value) {
      const answer = window.confirm('您有未保存的修改，确定要离开吗？')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  })
}
