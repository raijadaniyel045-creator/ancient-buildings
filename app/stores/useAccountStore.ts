import generateRandomString from '~/utils/generateRandomString'
import type {
  AccountPublicInfo,
  AuthLoginCommand,
  AuthLoginResponse, AuthRegisterCommand, AuthRegisterResponse,
  RefreshTokenCommand,
  RefreshTokenResponse
} from '~/types'

interface AuthState {
  machineHash: string | null
  accessToken: string | null
  refreshToken: string | null
  userId: number | string | null
  email: string | null
  isLoggedIn: boolean
  rememberMe: boolean
  publicInfo: AccountPublicInfo | null
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
      const { data, error } = await useFetch<AuthLoginResponse>('/api/v1/Secure/login', {
        method: 'POST',
        body: {
          email: credentials.email,
          password: await sha256(credentials.password),
          hash: this.getMachineHash()
        } as AuthLoginCommand
      })
      if (error.value || data.value === undefined) {
        throw new Error('Login failed')
      }
      this.userId = data.value.userId
      this.email = data.value.email
      this.accessToken = data.value.accessToken
      this.refreshToken = data.value.refreshToken
      this.isLoggedIn = true
      if (import.meta.client) {
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('refresh_token', data.value.refreshToken)
        storage.setItem('remember_me', String(rememberMe))
      }
      await this.getAccount()
    },
    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.userId = null
      this.email = null
      this.isLoggedIn = false
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
      // 从存储中获取 refreshToken
      let storedRefreshToken = this.refreshToken
      if (!storedRefreshToken && import.meta.client) {
        // 优先从对应的存储里读取，兼容页面刷新后的状态恢复
        const isRemember = localStorage.getItem('remember_me') === 'true'
        const storage = isRemember ? localStorage : sessionStorage
        storedRefreshToken = storage.getItem('refresh_token')
      }
      if (!storedRefreshToken) {
        this.logout()
        return false
      }
      const { data, error } = await useFetch<RefreshTokenResponse>('/api/v1/Secure/refresh', {
        method: 'POST',
        body: {
          userId: this.userId,
          email: this.email,
          hash: this.getMachineHash(),
          refreshToken: this.refreshToken
        } as RefreshTokenCommand
      })
      if (error.value || data.value === undefined) {
        return false
      }
      this.accessToken = data.value.accessToken
      await this.getAccount()
      return true
    },
    /**
     * 页面初始化时尝试从存储中恢复会话
     * 适合在 Nuxt 插件或 app.vue 中调用
     */
    async tryRestoreSession() {
      if (!import.meta.client) return false
      const rememberMe = localStorage.getItem('remember_me') === 'true'
      const storage = rememberMe ? localStorage : sessionStorage
      const savedRefreshToken = storage.getItem('refresh_token')
      if (!savedRefreshToken) return false
      this.rememberMe = rememberMe
      // 不直接存 refreshToken 到 state，防止 XSS 窃取，但为了方便刷新动作，也可以暂存
      this.refreshToken = savedRefreshToken
      // 尝试用 refreshToken 换取新的 accessToken
      const content = await this.refreshAccessToken()
      await this.getAccount()
      return content
    },
    async register(credentials: { username: string, email: string, password: string }, rememberMe: boolean) {
      this.logout()
      this.rememberMe = rememberMe
      const { data, error } = await useFetch<AuthRegisterResponse>('/api/v1/Secure/register', {
        method: 'POST',
        body: {
          username: credentials.username,
          email: credentials.email,
          password: await sha256(credentials.password)
        } as AuthRegisterCommand
      })
      if (error.value || data.value === undefined) {
        throw error
      }
    },
    async getAccount(): Promise<AccountPublicInfo | undefined> {
      if (!this.isLoggedIn) return undefined
      const { data, error } = await useFetch<AccountPublicInfo>('/api/v1/Account', {
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
