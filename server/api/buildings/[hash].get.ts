export default defineEventHandler(async (event) => {
  // 获取路由参数 slug
  const hash = getRouterParam(event, 'hash')
  if (!hash) {
    throw createError({ statusCode: 400, statusMessage: 'Missing Path' })
  }

  // 查询单个建筑
  const building = await queryCollection(event, 'buildings')
    .where('__hash__', '=', hash)
    .first()

  if (!building) {
    throw createError({ statusCode: 404, statusMessage: 'Building not found' })
  }

  return {
    img: building.img,
    title: building.title,
    provinces: building.provinces || [],
    dynasties: building.dynasties || [],
    categories: building.categories || [],
    name: building.name,
    desc: building.desc,
    subtitle: building.subtitle,
    id: building.id,
    body: building.body
  }
})
