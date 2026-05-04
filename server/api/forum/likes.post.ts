export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { postId } = body
  
  if (!postId) {
    return { success: false, message: '帖子ID不能为空' }
  }
  
  return {
    success: true,
    message: '点赞成功'
  }
})