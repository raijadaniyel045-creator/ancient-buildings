export default defineNuxtRouteMiddleware(async (to, from) => {
// 获取 Pinia store 实例（必须在函数内部调用）
  const authStore = useAccountStore()
  const localePath = useLocalePath()

  // 定义需要登录才能访问的页面列表（可根据路由名称或路径匹配）
  const protectedRoutes = ['/friends']
  const isProtected = protectedRoutes.some(route => to.path.startsWith(route))

  // 如果不是受保护页面，直接放行
  if (!isProtected) return

  // ========== 服务端渲染阶段 ==========
  if (import.meta.server) {
    // 服务端无法获取持久化存储的 token，只能信任 store 中是否已有用户信息
    // 通常服务端第一次渲染时 store 是空的，要避免重定向（会导致页面闪烁）
    // 可以简单放行，让客户端再进行一次校验
    return
  }
  // ========== 客户端环境 ==========
  // 1. 如果 store 中显示未登录，尝试从存储中恢复会话
  if (!authStore.isLoggedIn && !authStore.accessToken) {
    const restored = await authStore.tryRestoreSession()
    if (!restored) {
      // 未登录且无法恢复，重定向到登录页，并携带 redirect 参数
      return navigateTo({
        path: localePath('/auth/login'),
        query: { redirect: to.fullPath }
      })
    }
  }
  // 2. 已登录，但需要检查 accessToken 是否即将过期（可选前置刷新）
  if (authStore.isLoggedIn && authStore.accessToken) {
    await authStore.refreshAccessToken()
    // 如果刷新失败，重定向
    if (!authStore.accessToken) {
      return navigateTo({
        path: localePath('/auth/login'),
        query: { redirect: to.fullPath }
      })
    }
  }
  // 3. 已登录且 token 有效，放行
})
