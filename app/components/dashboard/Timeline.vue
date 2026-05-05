<template>
  <div class="grid grid-cols-12 gap-6 min-h-[750px] bg-[#0A0807] p-6">
    <!-- 左翼主控室 (占位 4 列)：历史罗盘与打字机文案 -->
    <div class="col-span-4 flex flex-col gap-6">
      <!-- 罗盘控制器 -->
      <div class="h-[350px] bg-[#1A1412]/80 backdrop-blur-md rounded-xl border border-white/10 p-5 shadow-lg relative">
        <h3 class="absolute top-5 left-5 text-lg font-serif text-[#D4AF37] z-10 flex items-center gap-2 pointer-events-none">
          <UIcon
            name="i-heroicons-clock"
            class="w-5 h-5"
          /> 历史罗盘
        </h3>
        <!-- 注入罗盘组件并监听回调 -->
        <DashboardEraCompass
          :active-era="selectedEra"
          @era-selected="handleEraChange"
        />
      </div>

      <!-- 动态铭牌面板 -->
      <div class="flex-1 bg-[#1A1412]/80 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg flex flex-col">
        <h3 class="text-3xl font-serif text-[#D44A4A] mb-4 border-b border-white/10 pb-3 font-bold tracking-widest">
          {{ selectedEra }}
        </h3>
        <p class="text-sm leading-loose text-white/70 font-serif tracking-wide text-justify">
          {{ currentChronicle }}
        </p>
        <div class="mt-auto pt-4 flex items-end justify-between border-t border-white/10">
          <span class="text-xs text-white/40">已收录遗存总量</span>
          <span class="text-3xl font-serif text-[#D4AF37]">{{ currentEraTotal }}</span>
        </div>
      </div>
    </div>

    <!-- 中枢视野 (占位 8 列)：呼吸散点图与后续雷达图预留 -->
    <div class="col-span-8 flex flex-col gap-6">
      <!-- 空间映射视图 -->
      <div class="flex-1 bg-[#1A1412]/80 backdrop-blur-md rounded-xl border border-white/10 p-2 shadow-lg relative">
        <h3 class="absolute top-5 left-5 text-lg font-serif text-[#D4AF37] z-10 flex items-center gap-2 pointer-events-none">
          <UIcon
            name="i-heroicons-fire"
            class="w-5 h-5"
          /> {{ selectedEra }}·星火燎原
        </h3>
        <DashboardEraScatterMap :chart-data="currentMapData" />
      </div>

      <!-- 画像视图 -->
      <div class="h-[250px] bg-[#1A1412]/80 backdrop-blur-md rounded-xl border border-white/10 p-5 shadow-lg relative flex flex-col">
        <h3 class="absolute top-5 left-5 text-lg font-serif text-[#D4AF37] z-10 flex items-center gap-2 pointer-events-none">
          <UIcon name="i-heroicons-chart-pie" class="w-5 h-5" /> {{ selectedEra }}·建筑画像
        </h3>
        <div class="flex-1 w-full mt-4">
          <!-- 注入雷达图，通过 props 传递 selectedEra 触发重绘 -->
          <DashboardEraRadar :active-era="selectedEra" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const ERA_CHRONICLES: Record<string, string> = {
  远古及先秦: '文明初曙。多为土木混合的半地穴或高台建筑遗址，展现了早期人类对自然环境的适应与改造。',
  秦汉: '气象宏大。阿房宫与长城奠定了大一统帝国的建筑基调，砖瓦开始广泛使用，斗拱雏形初现。',
  魏晋南北朝: '民族融合与佛教东传。石窟寺大规模开凿，塔建筑开始成为时代标志。',
  隋唐五代: '雄浑舒展。结构严谨，出檐深远，是中国木构建筑的成熟巅峰，体现大唐风范。',
  宋辽金: '柔美细腻。建筑制式开始向标准化发展，《营造法式》颁布。辽金建筑保留了更多唐代遗风。',
  元: '粗犷减柱。受战乱与游牧文化影响，元代建筑常使用“减柱造”，追求空间实用性。',
  明: '法度森严。砖石建筑大发展，明长城与故宫确立了中国晚期宫殿建筑的绝对范式。',
  清: '繁丽精巧。斗拱失去结构作用沦为装饰，雕梁画栋达到极致，皇家园林与私家园林交相辉映。',
  近现代: '中西交融。传统形制受到西方建筑理念冲击，引入钢筋混凝土等新材料，开启近代化转型。'
}

const selectedEra = ref<string>('隋唐五代')
const currentChronicle = computed(() => ERA_CHRONICLES[selectedEra.value] || '文献暂缺。')

const { data: rawResponse } = await useAsyncData('timeline-data', () => $fetch('/api/dashboard/timeline-data'))

function getStandardEra(rawEra: string): string {
  if (!rawEra) return '未知'
  const era = String(rawEra)
  if (/\d{4}/.test(era)) {
    const year = parseInt(era.match(/\d{4}/)![0])
    if (year >= 1912) return '近现代'
    if (year >= 1636) return '清'
    if (year >= 1368) return '明'
    if (year >= 960) return '宋辽金'
  }
  if (/[民国|现代|当代|世纪|19\d{2}|20\d{2}]/.test(era)) return '近现代'
  if (/清|18\d{2}/.test(era)) return '清'
  if (/明/.test(era)) return '明'
  if (/元/.test(era)) return '元'
  if (/[宋|辽|金|西夏|大理]/.test(era)) return '宋辽金'
  if (/[隋|唐|五代|渤海|高昌]/.test(era)) return '隋唐五代'
  if (/[魏|晋|南北朝|十六国|六朝|高句丽]/.test(era)) return '魏晋南北朝'
  if (/[秦|汉|三国]/.test(era)) return '秦汉'
  if (/[石器|夏|商|周|春秋|战国|先秦]/.test(era)) return '远古及先秦'
  return '未知'
}

const parsedData = computed(() => {
  const allData = rawResponse.value && Array.isArray((rawResponse.value as any).data)
    ? (rawResponse.value as any).data
    : []

  return allData.map((item: any) => ({
    province: item.province || '未知',
    era: getStandardEra(item.era)
  }))
})

const currentEraData = computed(() => {
  return parsedData.value.filter((item: any) => item.era === selectedEra.value)
})

const currentEraTotal = computed(() => currentEraData.value.length)

// 执行归约聚合逻辑 (Reduce) 获取省份频数
const currentMapData = computed(() => {
  const counts = currentEraData.value.reduce((acc: Record<string, number>, curr: any) => {
    acc[curr.province] = (acc[curr.province] || 0) + 1
    return acc
  }, {})

  return Object.entries(counts).map(([name, value]) => ({ name, value }))
})

const handleEraChange = (newEra: string) => {
  selectedEra.value = newEra
}
</script>
