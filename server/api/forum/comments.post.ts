import { currentUser } from '../../data/friends'

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { postId, content } = body
  
  if (!postId || !content || content.trim() === '') {
    return { success: false, message: '参数不完整' }
  }
  
  const newComment: Comment = {
    id: `c${Date.now()}`,
    postId,
    userId: currentUser.id,
    userName: currentUser.name,
    userAvatar: currentUser.avatar,
    content: content.trim(),
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
    message: '评论成功',
    comment: newComment
  }
})