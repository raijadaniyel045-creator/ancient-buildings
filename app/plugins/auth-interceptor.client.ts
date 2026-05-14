// plugins/auth-interceptor.client.ts (仅客户端执行)
export default defineNuxtPlugin(async () => {
  const localePath = useLocalePath()
  const authStore = useAccountStore()
  await authStore.tryRestoreSession()
  // 全局 fetch 拦截器（适用于 $fetch 和 useFetch）
  const interceptor = $fetch.create({
    onRequest({ options }) {
      // 给请求头添加 Access Token
      if (authStore.accessToken) {
        options.headers.set('Authorization', `Bearer ${authStore.accessToken}`)
      }
    },
    async onResponseError({ response, options }) {
      // 如果返回 401，尝试刷新 token
      if (response.status === 401) {
        const refreshed = await authStore.refreshAccessToken()
        if (refreshed) {
          // 刷新成功，重试原始请求
          options.headers.set('Authorization', `Bearer ${authStore.accessToken}`)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return $fetch(response.url, options)
        } else {
          // 刷新失败，跳转到登录页
          await navigateTo(localePath('/auth'))
          authStore.logout()
          return Promise.reject(response)
        }
      }
      return Promise.reject(response)
    }
  })

  // 全局注入，让所有地方使用 $authFetch
  return {
    provide: {
      authFetch: interceptor
    }
  }
})
