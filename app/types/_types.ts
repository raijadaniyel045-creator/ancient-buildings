/** 由 stc v2.16.1 生成
 *
 * https://github.com/long-woo/stc
 * 2026-05-06 07:05:00
 */

// #region AccountFullInfo
export interface AccountFullInfo {
  userId?: number | string
  userName?: string
  avatar?: string
  email?: string
  createdAt?: string
  description?: string
  online?: boolean
  location?: string
  tags?: string[]
}
// #endregion

// #region AccountPublicInfo
export interface AccountPublicInfo {
  userId?: number | string
  userName?: string
  avatar?: string
  email?: string
  createdAt?: string
  description?: string
  online?: boolean
  location?: string
  tags?: string[]
}
// #endregion

// #region ArrayPair
export interface ArrayPair {
  length?: number | string
  values?: string[]
}
// #endregion

// #region AuthChangeEmailCommand
export interface AuthChangeEmailCommand {
  userId: number | string
  newEmail: string
}
// #endregion

// #region AuthChangePasswordCommand
export interface AuthChangePasswordCommand {
  userId: number | string
  newPassword: string
  confirmKey: string
}
// #endregion

// #region AuthLoginCommand
export interface AuthLoginCommand {
  email: string
  hash: string
  password: string
}
// #endregion

// #region AuthLoginResponse
export interface AuthLoginResponse {
  userId: number | string
  email: string
  accessToken: string
  accessTokenExpire: string
  refreshToken: string
  refreshTokenExpire: string
}
// #endregion

// #region AuthRegisterCommand
export interface AuthRegisterCommand {
  email: string
  password: string
  username: string
}
// #endregion

// #region AuthRegisterResponse
export interface AuthRegisterResponse {
  userId: number | string
  email: string
  username: string
  createdAt: string
}
// #endregion

// #region AuthResetPasswordCommand
export interface AuthResetPasswordCommand {
  email: string
  confirmKey: string
  password: string
  newPassword: string
}
// #endregion

// #region BuildingArticle
export interface BuildingArticle {
  img: string
  title: string
  provinces: string[]
  dynasties: string[]
  categories: string[]
  name: string
  desc: string
  subtitle: string
  id: string
  body: string
}
// #endregion

// #region BuildingSlug
export interface BuildingSlug {
  hash: string
  name: string
  desc: string
  img: string
  provinces: string[]
  categories: string[]
  dynasties: string[]
}
// #endregion

// #region BuildingSummaryResponse
export interface BuildingSummaryResponse {
  provinces?: ArrayPair
  categories?: ArrayPair
  dynasties?: ArrayPair
  total?: number | string
}
// #endregion

// #region FriendInfo
export interface FriendInfo {
  userId?: number | string
  userName?: string
  description?: string
  online?: boolean
  location?: string
  avatar?: string
  tags?: string[]
  matchScore?: number | string
}
// #endregion

// #region FriendsSummary
export interface FriendsSummary {
  total?: number | string
  online?: number | string
  request?: number | string
}
// #endregion

// #region NewFriendRequest
export interface NewFriendRequest {
  userId?: number | string
  userName?: string
  avatar?: string
  reason?: string
  createdAt?: string
}
// #endregion

// #region ProblemDetails
export interface ProblemDetails {
  type?: null | string
  title?: null | string
  status?: null | number | string
  detail?: null | string
  instance?: null | string
}
// #endregion

// #region RecentActivityLog
export interface RecentActivityLog {
  userId?: number | string
  userName?: string
  decs?: string
  avatar?: string
  url?: null | string
}
// #endregion

// #region RefreshTokenCommand
export interface RefreshTokenCommand {
  userId: number | string
  email: string
  hash: string
  refreshToken: string
}
// #endregion

// #region RefreshTokenResponse
export interface RefreshTokenResponse {
  userId: number | string
  accessToken: string
  accessTokenExpire: string
}
// #endregion

// #region SearchFriendsCommand
export interface SearchFriendsCommand {
  searchTags?: string[]
  searches?: string[]
}
// #endregion

// #region SplitFriendsArrayResponse
export interface SplitFriendsArrayResponse {
  users?: FriendInfo[]
  count?: number | string
  page?: number | string
  pageSize?: number | string
}
// #endregion

// #region SplitPageFriendsCommand
export interface SplitPageFriendsCommand {
  page?: null | number | string
  search?: null | string
}
// #endregion

// #region SplitPageResponse
export interface SplitPageResponse {
  items?: BuildingSlug[]
  total?: number | string
}
// #endregion

// #region ValidationProblemDetails
export interface ValidationProblemDetails {
  type?: null | string
  title?: null | string
  status?: null | number | string
  detail?: null | string
  instance?: null | string
  errors?: Record<string, unknown>
}
// #endregion
