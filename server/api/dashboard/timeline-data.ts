import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler((event) => {
  const dataDir = path.resolve(process.cwd(), 'content/data')

  if (!fs.existsSync(dataDir)) {
    return { code: 404, data: [] }
  }

  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
  const allData = []

  // 极简提取，只拿省份和朝代
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8')
      const json = JSON.parse(content)

      allData.push({
        province: (json.province || '未知').trim(),
        era: (json.era || '未知').trim()
      })
    } catch (e) {
      continue
    }
  }

  return { code: 200, data: allData }
})
