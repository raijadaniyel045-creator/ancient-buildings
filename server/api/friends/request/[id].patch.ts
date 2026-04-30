import { mockFriendRequests, mockUsers, friendsList } from '../../../data/friends'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)
  const { action } = body

  if (!id || !action || !['accept', 'reject'].includes(action)) {
    return { success: false, message: '参数无效' }
  }

  const requestIndex = mockFriendRequests.findIndex(r => r.id === id)
  
  if (requestIndex === -1) {
    return { success: false, message: '请求不存在' }
  }

  const request = mockFriendRequests[requestIndex]
  
  if (action === 'accept') {
    request.status = 'accepted'
    // 将请求发送者添加到好友列表
    const newFriend = mockUsers.find(u => u.id === request.fromUserId)
    if (newFriend && !friendsList.some(f => f.id === newFriend.id)) {
      friendsList.push(newFriend)
    }
    return { 
      success: true, 
      message: `已接受 ${request.fromUserName} 的好友请求`,
      request 
    }
  } else {
    request.status = 'rejected'
    return { 
      success: true, 
      message: `已拒绝 ${request.fromUserName} 的好友请求`,
      request 
    }
  }
})