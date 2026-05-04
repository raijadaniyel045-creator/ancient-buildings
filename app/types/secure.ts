export interface LoginRequest {
  email: string
  hash: string
  password: string
}
export interface LoginResponse {
  userId: number
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
  userId: number
  email: string
  username: string
  createdAt: string
}
export interface RefreshTokenRequest {
  userId: number
  email: string
  hash: string
  refreshToken: string
}
export interface RefreshTokenResponse {
  userId: number
  accessToken: string
  accessTokenExpire: string
}
