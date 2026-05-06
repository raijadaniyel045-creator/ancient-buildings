export default defineNuxtRouteMiddleware(async (to, from) => {
// 获取 Pinia store 实例（必须在函数内部调用）
  const authStore = useAccountStore()
  const localePath = useLocalePath()

  // 定义需要登录才能访问的页面列表（可根据路由名称或路径匹配）
  const protectedRoutes = ['/friends']
  const isProtected = protectedRoutes.some(route => to.path.startsWith(route))

  // 如果不是受保护页面，直接放行
  if (!isProtected) return

  if (import.meta.server) {
    return
  }
  // ========== 客户端环境 ==========
  // 1. 如果 store 中显示未登录，尝试从存储中恢复会话
  if (!authStore.isLoggedIn || !authStore.accessToken) {
    const restored = await authStore.tryRestoreSession()
    if (!restored) {
      // 未登录且无法恢复，重定向到登录页，并携带 redirect 参数
      return navigateTo({
        path: localePath('/auth/login'),
        query: { redirect: to.fullPath }
      })
    }
  }
})
