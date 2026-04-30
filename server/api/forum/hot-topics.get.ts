import { mockHotTopics } from '../../data/friends'

export default defineEventHandler(() => {
  return {
    success: true,
    topics: mockHotTopics
  }
})