import { mockPosts, mockComments } from '../../../data/friends'

export default defineEventHandler((event) => {
  const id = event.context.params?.id
  
  const post = mockPosts.find(p => p.id === id)
  
  if (!post) {
    return { success: false, message: '帖子不存在' }
  }
  
  const comments = mockComments.filter(c => c.postId === id)
  
  return {
    success: true,
    post,
    comments
  }
})