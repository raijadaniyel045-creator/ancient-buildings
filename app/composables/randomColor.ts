import randomColor from 'randomcolor'

export const generateRandomColors = (count: number) => {
  // 生成协调的随机色板
  return randomColor({ count, luminosity: 'bright' })
}
