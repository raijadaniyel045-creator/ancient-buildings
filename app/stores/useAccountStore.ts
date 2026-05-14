import generateRandomString from '~/utils/generateRandomString'
import type { components } from '~/types'

export const useAccountStore = defineStore('useAccountStore', () => {
  const machineHash = ref<string | null | undefined>(null)

  const accessToken = ref<string | null | undefined>(null)
  const refreshToken = ref<string | null | undefined>(null)
  const isLoggedIn = ref<boolean>(false)

  const userId = ref<number | string | null | undefined>(null)
  const email = ref<string | null | undefined>(null)

  const rememberMe = ref<boolean | null | undefined>(null)

  const publicInfo = ref<components['schemas']['AccountPublicInfoResponse'] | null | undefined>(null)

  function getMachineHash(): string {
    if (machineHash.value === null || machineHash.value === undefined) {
      machineHash.value = generateRandomString(32)
    }
    return machineHash.value
  }
  /**
   * 登录
   * @param credentials 账号密码
   * @param remember true=长期登录(存localStorage)，false=临时登录(存sessionStorage)
   */
  async function login(credentials: { email: string, password: string }, remember: boolean) {
    rememberMe.value = remember
    const { data } = await useFetch<components['schemas']['AuthLoginResponse']>('/api/v1/Secure/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        password: await sha256(credentials.password),
        hash: getMachineHash()
      } as components['schemas']['AuthLoginCommand']
    })
    userId.value = data.value?.userId
    email.value = data.value?.email
    accessToken.value = data.value?.accessToken
    refreshToken.value = data.value?.refreshToken
    isLoggedIn.value = true
    await getAccount()
    if (import.meta.client) {
      const storage = rememberMe.value ? localStorage : sessionStorage
      storage.setItem('refresh_token', data.value?.refreshToken || '')
      storage.setItem('remember_me', String(rememberMe))
    }
  }
  function logout() {
    accessToken.value = null
    refreshToken.value = null
    userId.value = null
    email.value = null
    isLoggedIn.value = false
    publicInfo.value = null
    if (import.meta.client) {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('remember_me')
      sessionStorage.removeItem('refresh_token')
      sessionStorage.removeItem('remember_me')
    }
  }
  /**
   * 刷新 Access Token
   * 由请求拦截器或定时器调用
   */
  async function refreshAccessToken(): Promise<boolean> {
    if (refreshToken.value === null) {
      logout()
      return false
    }
    const { data, error } = await useFetch<components['schemas']['RefreshTokenResponse']>('/api/v1/Secure/refresh', {
      method: 'POST',
      body: {
        userId: userId.value,
        email: email.value,
        hash: getMachineHash(),
        refreshToken: refreshToken.value
      } as components['schemas']['RefreshTokenCommand']
    })
    if (error.value) {
      logout()
      return false
    }
    accessToken.value = data.value?.accessToken || null
    await getAccount()
    return true
  }
  /**
   * 页面初始化时尝试从存储中恢复会话
   * 适合在 Nuxt 插件或 app.vue 中调用
   */
  async function tryRestoreSession() {
    if (!import.meta.client) return false
    rememberMe.value = localStorage.getItem('remember_me') === 'true'
    if (rememberMe.value) {
      // 不直接存 refreshToken 到 state，防止 XSS 窃取，但为了方便刷新动作，也可以暂存
      const savedRefreshToken = localStorage.getItem('refresh_token')
      if (savedRefreshToken === null) return false
      refreshToken.value = savedRefreshToken
      // 尝试用 refreshToken 换取新的 accessToken
      return await refreshAccessToken()
    }
    return false
  }
  async function register(credentials: { username: string, email: string, password: string }, remember: boolean) {
    logout()
    rememberMe.value = remember
    await useFetch<components['schemas']['AuthRegisterResponse']>('/api/v1/Secure/register', {
      method: 'POST',
      body: {
        username: credentials.username,
        email: credentials.email,
        password: await sha256(credentials.password)
      } as components['schemas']['AuthRegisterCommand']
    })
    await login({
      email: credentials.email,
      password: credentials.password
    }, rememberMe.value)
  }
  async function getAccount(): Promise<components['schemas']['AccountPublicInfoResponse'] | undefined> {
    if (!isLoggedIn.value) return undefined
    const { data, error } = await useFetch<components['schemas']['AccountPublicInfoResponse']>(`/api/v1/Account/${userId.value}`)
    if (error.value || data.value === undefined) return undefined
    publicInfo.value = data.value
    return data.value
  }
  return ({
    machineHash,
    accessToken,
    refreshToken,
    isLoggedIn,
    userId,
    email,
    rememberMe,
    publicInfo,
    getMachineHash,
    login,
    logout,
    refreshAccessToken,
    tryRestoreSession,
    register,
    getAccount
  })
}, {
  persist: true
})
