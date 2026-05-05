export interface LoginRequest {
  email: string
  hash: string
  password: string
}
export interface LoginResponse {
  userid: number
  email: string
  accessToken: string
  accessTokenExpire: string
  refreshToken: string
  refreshTokenExpire: string
}
export interface RegisterRequest {
  email: string
  username: string
  password: string
}
export interface RegisterResponse {
  userid: number
  email: string
  username: string
  createdAt: string
}
export interface RefreshTokenRequest {
  userid: number
  email: string
  hash: string
  refreshToken: string
}
export interface RefreshTokenResponse {
  userid: number
  accessToken: string
  accessTokenExpire: string
}
export interface AccountPublicInfo {
  userid: number
  email: string
  userName: string
  createdAt: string
}
