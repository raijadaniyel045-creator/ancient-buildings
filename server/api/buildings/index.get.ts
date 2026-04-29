export default defineEventHandler(async (event) => {
  // 1. 获取查询参数
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 12
  const provincesParam = query.provinces as string || ''
  const provinces = provincesParam ? provincesParam.split(',').filter(t => t !== '') : []
  const dynastiesParam = query.dynasties as string || ''
  const dynasties = dynastiesParam ? dynastiesParam.split(',').filter(t => t !== '') : []
  const categoriesParam = query.categories as string || ''
  const categories = categoriesParam ? categoriesParam.split(',').filter(t => t !== '') : []
  const searchesParam = query.searchs as string || ''
  const searches = searchesParam ? searchesParam.split(',').filter(t => t !== '') : []

  // 2. 查询所有建筑数据（只选择需要的字段，减少数据传输）
  const AllBuildings = await queryCollection(event, 'buildings')
    .select('provinces', 'dynasties', 'categories', 'name', 'desc', '__hash__')
    .all()

  // 4. 过滤：根据 tags（要求每个 tag 都存在于 building 的 province/dynasty/category 中或存在于building的name或desc）
  let filtered = AllBuildings

  if (provinces.length) {
    filtered = filtered.filter(t => provinces.every(f => t.provinces.includes(f)))
  }
  if (dynasties.length) {
    filtered = filtered.filter(t => dynasties.every(f => t.dynasties.includes(f)))
  }
  if (categories.length) {
    filtered = filtered.filter(t => categories.every(f => t.categories.includes(f)))
  }
  filtered = filtered.filter((building) => {
    return searches.every((tag) => {
      return (building.name && building.name.includes(tag))
        || (building.desc && building.desc.includes(tag))
    })
  })

  // 5. 分页
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedItems = filtered.slice(start, end)
    .map((t) => {
      return {
        ...t,
        __hash__: undefined,
        hash: t.__hash__
      }
    })

  // 6. 返回结果
  return {
    items: paginatedItems,
    total: AllBuildings.length,
    filter: filtered.length,
    page,
    pageSize
  }
})
