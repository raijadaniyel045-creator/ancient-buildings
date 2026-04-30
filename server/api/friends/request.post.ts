import { mockUsers, currentUser } from '../../data/friends'

export interface FriendRequest {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserAvatar: string
  reason: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, reason } = body
  
  if (!userId) {
    return { success: false, message: '用户ID不能为空' }
  }
  
  const targetUser = mockUsers.find(u => u.id === userId)
  
  if (!targetUser) {
    return { success: false, message: '用户不存在' }
  }
  
  const newRequest: FriendRequest = {
    id: `fr${Date.now()}`,
    fromUserId: currentUser.id,
    fromUserName: currentUser.name,
    fromUserAvatar: currentUser.avatar,
    reason: reason || '想加你为好友，一起探讨古建筑文化',
    status: 'pending',
    createdAt: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  return {
    success: true,
    message: '好友请求已发送',
    request: newRequest
  }
})