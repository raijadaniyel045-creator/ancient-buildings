export const useTerminology = () => {
  const termDict: Record<string, string> = {
    斗拱: '中国古代建筑特有的结构，位于柱顶、额枋与屋檐之间，起到承重与装饰作用。',
    大木作: '古建筑中木造骨架的统称，负责整座建筑的支撑结构，包括梁、柱、檩等。',
    檐椽: '屋顶伸出檐外的椽子，决定了古建筑飞檐跳出的美感。',
    榫卯: '利用木件凹凸处理进行连接的古建筑结构，体现了极高的力学与美学智慧。',
    营造法式: '北宋李诫编著，是中国古代最完整的建筑技术百科全书。'
  }

  const termRegex = computed(() => {
    const keys = Object.keys(termDict).join('|')
    return new RegExp(`(${keys})`, 'g')
  })

  return { termDict, termRegex }
}
