export default defineEventHandler(async (event) => {
  // 获取路由参数 slug
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  // 查询单个建筑
  const building = await queryCollection(event, 'buildings')
    .path(`/buildings/${slug}`)
    .first()

  if (!building) {
    throw createError({ statusCode: 404, statusMessage: 'Building not found' })
  }

  return {
    id: building.id,
    img: building.img,
    desc: building.desc,
    name: building.name,
    title: building.title,
    subtitle: building.subtitle,
    province: building.province,
    dynasty: building.dynasty,
    category: building.category,
    body: building.body
  }
})
