import generateRandomString from '~/utils/generateRandomString'
import type { components } from '~/types'

interface AuthState {
  machineHash: string | null
  accessToken: string | null
  refreshToken: string | null
  userId: number | string | null
  email: string | null
  isLoggedIn: boolean
  rememberMe: boolean
  publicInfo: components['schemas']['AccountPublicInfoResponse'] | null
}
export const useAccountStore = defineStore('useAccountStore', {
  state: (): AuthState => ({
    machineHash: null,
    accessToken: null,
    refreshToken: null,
    userId: null,
    email: null,
    isLoggedIn: false,
    rememberMe: false,
    publicInfo: null
  }),
  actions: {
    getMachineHash(): string {
      if (this.machineHash === null) {
        this.machineHash = generateRandomString(32)
      }
      return this.machineHash
    },
    /**
     * 登录
     * @param credentials 账号密码
     * @param rememberMe true=长期登录(存localStorage)，false=临时登录(存sessionStorage)
     */
    async login(credentials: { email: string, password: string }, rememberMe: boolean) {
      this.rememberMe = rememberMe
      const { data, error } = await useFetch<components['schemas']['AuthLoginResponse']>('/api/v1/Secure/login', {
        method: 'POST',
        body: {
          email: credentials.email,
          password: await sha256(credentials.password),
          hash: this.getMachineHash()
        } as components['schemas']['AuthLoginCommand']
      })
      if (error.value || data.value === undefined) {
        throw new Error('Login failed')
      }
      this.userId = data.value.userId
      this.email = data.value.email
      this.accessToken = data.value.accessToken
      this.refreshToken = data.value.refreshToken
      this.isLoggedIn = true
      await this.getAccount()
      if (import.meta.client) {
        const storage = this.rememberMe ? localStorage : sessionStorage
        storage.setItem('refresh_token', data.value.refreshToken)
        storage.setItem('remember_me', String(this.rememberMe))
      }
    },
    logout() {
      console.log('Logout')
      this.accessToken = null
      this.refreshToken = null
      this.userId = null
      this.email = null
      this.isLoggedIn = false
      this.publicInfo = null
      if (import.meta.client) {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('remember_me')
        sessionStorage.removeItem('refresh_token')
        sessionStorage.removeItem('remember_me')
      }
    },
    /**
     * 刷新 Access Token
     * 由请求拦截器或定时器调用
     */
    async refreshAccessToken(): Promise<boolean> {
      console.log('Refresh access token')
      if (this.refreshToken === null) {
        this.logout()
        return false
      }
      const { data, error } = await useFetch<components['schemas']['RefreshTokenResponse']>('/api/v1/Secure/refresh', {
        method: 'POST',
        body: {
          userId: this.userId,
          email: this.email,
          hash: this.getMachineHash(),
          refreshToken: this.refreshToken
        } as components['schemas']['RefreshTokenCommand']
      })
      if (error.value) {
        this.logout()
        return false
      }
      this.accessToken = data.value?.accessToken || null
      await this.getAccount()
      return true
    },
    /**
     * 页面初始化时尝试从存储中恢复会话
     * 适合在 Nuxt 插件或 app.vue 中调用
     */
    async tryRestoreSession() {
      console.log('Trying to restore session')
      if (!import.meta.client) return false
      this.rememberMe = localStorage.getItem('remember_me') === 'true'
      if (this.rememberMe) {
        // 不直接存 refreshToken 到 state，防止 XSS 窃取，但为了方便刷新动作，也可以暂存
        const savedRefreshToken = localStorage.getItem('refresh_token')
        if (savedRefreshToken === null) return false
        this.refreshToken = savedRefreshToken
        // 尝试用 refreshToken 换取新的 accessToken
        return await this.refreshAccessToken()
      }
      return false
    },
    async register(credentials: { username: string, email: string, password: string }, rememberMe: boolean) {
      this.logout()
      this.rememberMe = rememberMe
      const { data, error } = await useFetch<components['schemas']['AuthRegisterResponse']>('/api/v1/Secure/register', {
        method: 'POST',
        body: {
          username: credentials.username,
          email: credentials.email,
          password: await sha256(credentials.password)
        } as components['schemas']['AuthRegisterCommand']
      })
      if (error.value || data.value === undefined) {
        throw error
      }
      await this.login({
        email: credentials.email,
        password: credentials.password
      }, rememberMe)
    },
    async getAccount(): Promise<components['schemas']['AccountPublicInfoResponse'] | undefined> {
      if (!this.isLoggedIn) return undefined
      const { data, error } = await useFetch<components['schemas']['AccountPublicInfoResponse']>('/api/v1/Account', {
        query: {
          userId: this.userId
        }
      })
      if (error.value || data.value === undefined) return undefined
      this.publicInfo = data.value
      return data.value
    }
  },
  persist: true
})
