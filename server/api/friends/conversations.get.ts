import { mockConversations } from '../../data/friends'

export default defineEventHandler((event) => {
  return {
    success: true,
    conversations: mockConversations
  }
})
