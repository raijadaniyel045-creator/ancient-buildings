export default defineEventHandler(async (event) => {
  const data = await queryCollection(event, 'data')
    .select('era', 'province', 'city', 'category')
    .all()
  return { code: 200, data: data }
})
