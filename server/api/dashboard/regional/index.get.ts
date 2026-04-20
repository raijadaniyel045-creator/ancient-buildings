interface ProvinceRegion {
  province: string
  count: number
}
export default defineEventHandler(async (event): Promise<ProvinceRegion[]> => {
  // 查询单个建筑
  const data = await queryCollection(event, 'data')
    .select('province')
    .all()
  // 以province聚合,每个province有自己的city聚合
  const provinceMap = new Map<string, number>()
  for (const { province } of data) {
    if (!province) continue
    provinceMap.set(province, (provinceMap.get(province) ?? 0) + 1)
  }
  return Array.from(provinceMap, ([province, count]) => ({ province, count }))
})
