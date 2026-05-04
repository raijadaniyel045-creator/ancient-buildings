export default defineEventHandler(async (event) => {
  const target = `http://localhost:5224${event.path}`
  console.log('[proxy]', event.method, event.path, '→', target) // 看控制台输出
  try {
    return await $fetch(target, {
      method: event.method,
      headers: event.headers
    })
  } catch (err) {
    console.error('[proxy error]', err)
    throw createError({ statusCode: 500, message: 'Proxy failed' })
  }
})
