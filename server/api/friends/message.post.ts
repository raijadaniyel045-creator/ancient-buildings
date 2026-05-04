import { mockMessages, mockConversations } from '../../data/friends'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { toUserId, content } = body
  
  if (!toUserId || !content) {
    return {
      success: false,
      message: '参数无效'
    }
  }
  
  // 创建新消息
  const newMessage = {
    id: `m${Date.now()}`,
    fromUserId: 'current',
    toUserId,
    content,
    isRead: false,
    createdAt: new Date().toLocaleString('zh-CN')
  }
  
  mockMessages.push(newMessage)
  
  // 找到或创建对话
  let conversation = mockConversations.find(c => c.otherUserId === toUserId)
  
  if (conversation) {
    // 更新现有对话
    conversation.lastMessage = content
    conversation.lastMessageTime = newMessage.createdAt
  } else {
    // 创建新对话（简单实现）
    conversation = {
      id: `conv${Date.now()}`,
      userId: 'current',
      otherUserId: toUserId,
      otherUserName: '用户' + toUserId,
      otherUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20person%20portrait%20avatar&image_size=square',
      lastMessage: content,
      lastMessageTime: newMessage.createdAt,
      unreadCount: 0
    }
    mockConversations.push(conversation)
  }
  
  return {
    success: true,
    message: '消息发送成功',
    newMessage,
    conversation
  }
})
