export default defineEventHandler(async (event) => {
  // 1. 获取查询参数
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 12
  const tagsParam = query.tags as string || ''
  const tags = tagsParam ? tagsParam.split(',').filter(t => t !== '') : []

  // 2. 查询所有建筑数据（只选择需要的字段，减少数据传输）
  const allBuildings = await queryCollection(event, 'buildings')
    .select('id', 'name', 'province', 'dynasty', 'category', 'img', 'desc', 'title', 'subtitle', 'body', 'path')
    .all()

  // 3. 计算标签选项（province / dynasty / category 去重扁平）
  const provinceList = [...new Set(allBuildings.flatMap(b => b.province || []))]
  const dynastyList = [...new Set(allBuildings.flatMap(b => b.dynasty || []))]
  const categoryList = [...new Set(allBuildings.flatMap(b => b.category || []))]

  // 4. 过滤：根据 tags（要求每个 tag 都存在于 building 的 province/dynasty/category 中）
  let filtered = allBuildings
  if (tags.length) {
    filtered = allBuildings.filter((building) => {
      const buildingTags = [
        ...(building.province || []),
        ...(building.dynasty || []),
        ...(building.category || [])
      ]
      return tags.every(tag => buildingTags.includes(tag))
    })
  }

  // 5. 分页
  const total = filtered.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedItems = filtered.slice(start, end)

  // 6. 返回结果
  return {
    items: paginatedItems,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    tagOptions: {
      provinceList,
      dynastyList,
      categoryList
    }
  }
})
