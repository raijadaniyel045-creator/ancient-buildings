interface CityRegion {
  city: string
  count: number
}
export default defineEventHandler(async (event): Promise<CityRegion[]> => {
  const params = getRouterParams(event)
  const province = params.province
  // 查询单个建筑
  const data = await queryCollection(event, 'data')
    .select('province', 'city')
    .where('province', '=', province)
    .all()
  const cityMap = new Map<string, number>()
  for (const { city } of data) {
    if (!city) continue
    cityMap.set(city, (cityMap.get(city) ?? 0) + 1)
  }
  return Array.from(cityMap, ([city, count]) => ({ city, count }))
})
