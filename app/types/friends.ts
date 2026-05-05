export interface GlobalInfo {
  total: number
  online: number
  request: number
}

export interface FriendInfo {
  userId: number
  userName: string
  description: string
  online: boolean
  location: string
  tags: string[]
  avatar: string
}

export interface SplitFriendsArray {
  users: FriendInfo[]
  count: number
  page: number
  pageSize: number
}

export interface PendingRequest {
  userId: number
  userName: string
  avatar: string
  reason: string
  createdAt: string
}

export interface RecentActivity {
  userId: number
  desc: string
  avatar: string
  time: string
  url: string | undefined
}
