import { mockMessages, mockConversations } from '../../../data/friends'

export default defineEventHandler((event) => {
  const id = event.context.params?.id
  
  const conversation = mockConversations.find(c => c.id === id)
  if (!conversation) {
    return {
      success: false,
      message: '对话不存在'
    }
  }
  
  const messages = mockMessages.filter(m => 
    (m.fromUserId === conversation.otherUserId && m.toUserId === 'current') ||
    (m.fromUserId === 'current' && m.toUserId === conversation.otherUserId)
  )
  
  return {
    success: true,
    conversation,
    messages
  }
})
