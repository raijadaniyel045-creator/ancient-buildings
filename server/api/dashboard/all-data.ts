import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler((event) => {
  const dataDir = path.resolve(process.cwd(), 'content/data')

  if (!fs.existsSync(dataDir)) {
    return { code: 404, data: [] }
  }

  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
  const allData = []

  // 严格同步读取，并去除可能存在的隐藏空格
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8')
      const json = JSON.parse(content)

      allData.push({
        province: (json.province || '未知').trim(),
        city: (json.city || '未知').trim(),
        category: (json.category || '未知').trim()
      })
    } catch (e) {
      continue
    }
  }

  return { code: 200, data: allData }
})
