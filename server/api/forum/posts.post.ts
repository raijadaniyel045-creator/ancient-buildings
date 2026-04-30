interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  image?: string
  buildingId?: string
  buildingName?: string
  likes: number
  comments: number
  liked: boolean
  createdAt: string
}

const currentUser = {
  id: 'current',
  name: '我',
  avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20chinese%20person%20portrait%20avatar&image_size=square',
  bio: '热爱中国古建筑文化的探索者',
  interests: ['古建筑', '历史文化', '传统工艺'],
  province: '北京市',
  postsCount: 45,
  friendsCount: 89,
  createdAt: '2024-01-01'
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { content, image, buildingId, buildingName } = body
  
  if (!content || content.trim() === '') {
    return { success: false, message: '内容不能为空' }
  }
  
  const newPost: Post = {
    id: `p${Date.now()}`,
    userId: currentUser.id,
    userName: currentUser.name,
    userAvatar: currentUser.avatar,
    content: content.trim(),
    image,
    buildingId,
    buildingName,
    likes: 0,
    comments: 0,
    liked: false,
    createdAt: new Date().toLocaleString('zh-CN')
  }
  
  return {
    success: true,
    message: '发布成功',
    post: newPost
  }
})