import { mockPosts } from '../../data/friends'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 10
  const category = query.category as string || ''
  
  let filteredPosts = [...mockPosts]
  
  if (category && category !== '全部') {
    filteredPosts = filteredPosts.filter(post => post.category === category)
  }
  
  const total = filteredPosts.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedPosts = filteredPosts.slice(start, end)
  
  const categories = [...new Set(mockPosts.map(post => post.category))]
  
  return {
    posts: paginatedPosts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    categories: ['全部', ...categories]
  }
})