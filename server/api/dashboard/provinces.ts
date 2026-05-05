// server/api/dashboard/provinces.ts
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // process.cwd() 获取的是项目的根目录
    const dataDir = path.join(process.cwd(), 'content', 'data')

    // 2. 同步读取该目录下所有的文件名，并过滤出 .json 结尾的文件
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'))

    // 3. 准备一个对象来统计每个省份的数量
    const provinceCount: Record<string, number> = {}

    // 4. 遍历解析所有文件，进行累加统计
    for (const file of files) {
      const filePath = path.join(dataDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      try {
        const jsonData = JSON.parse(fileContent)
        const province = jsonData.province

        if (province) {
          // 如果该省份已经存在，数量 +1；如果不存在，初始化为 1
          provinceCount[province] = (provinceCount[province] || 0) + 1
        }
      } catch (parseError) {
        console.warn(`跳过解析失败的文件: ${file}`)
      }
    }

    // 5. 将统计结果从对象转换为数组，按数量降序排序，并截取前 10 名
    const sortedProvinces = Object.entries(provinceCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value) // 降序排列
      .slice(0, 10) // 取 Top 10

    return {
      code: 200,
      data: sortedProvinces
    }
  } catch (error) {
    console.error('统计省份数据时发生错误:', error)
    return {
      code: 500,
      message: '服务器读取数据失败',
      data: []
    }
  }
})
