export default defineEventHandler(async (event) => {
  // 2. 查询所有建筑数据（只选择需要的字段，减少数据传输）
  const provinceArray = await queryCollection(event, 'buildings')
    .select('dynasties')
    .all()

  const dynasties = [...new Set(provinceArray.flatMap(b => b.dynasties || []))]

  // 6. 返回结果
  return {
    dynasties,
    length: dynasties.length
  }
})
